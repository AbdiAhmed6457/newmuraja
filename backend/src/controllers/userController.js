
const prisma = require('../prismaClient');

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { location, educationLevel, bio, phoneNumber, name } = req.body;
  let photoUrl = req.body.photoUrl;

  if (req.file) {
    photoUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  }

  try {
    // Get current user to save previous photo
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    let previousPhotoUrl = currentUser.previousPhotoUrl;

    if (photoUrl && photoUrl !== currentUser.photoUrl) {
      previousPhotoUrl = currentUser.photoUrl;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { photoUrl, previousPhotoUrl, location, educationLevel, bio, phoneNumber, name }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const revertProfilePhoto = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user.previousPhotoUrl) {
      return res.status(400).json({ error: 'No previous photo to revert to' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        photoUrl: user.previousPhotoUrl,
        previousPhotoUrl: user.photoUrl // Swap them so we can toggle back if needed
      }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUstazList = async (req, res) => {
  try {
    const ustaz = await prisma.user.findMany({
      where: { role: 'USTAZ' },
      select: { id: true, name: true, photoUrl: true, bio: true, location: true, educationLevel: true }
    });
    res.json(ustaz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requestUstaz = async (req, res) => {
  const studentId = req.user.id;
  const { ustazId } = req.body;

  try {
    // Check if connection already exists
    const existingConnection = await prisma.connection.findUnique({
      where: {
        studentId_ustazId: {
          studentId: studentId,
          ustazId: parseInt(ustazId)
        }
      }
    });

    if (existingConnection) {
      return res.status(400).json({ error: 'Connection request already exists or processed' });
    }

    const connection = await prisma.connection.create({
      data: {
        studentId: studentId,
        ustazId: parseInt(ustazId),
        status: 'PENDING'
      }
    });
    res.json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  const ustazId = req.user.id;
  try {
    const requests = await prisma.connection.findMany({
      where: {
        ustazId: ustazId,
        status: 'PENDING'
      },
      include: {
        student: true
      }
    });
    // Flatten structure to return student details with connection ID if needed
    res.json(requests.map(req => ({ ...req.student, connectionId: req.id })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleRequest = async (req, res) => {
  const { connectionId, status } = req.body; // status: 'ACCEPTED' or 'REJECTED'

  try {
    const connection = await prisma.connection.update({
      where: { id: parseInt(connectionId) },
      data: { status: status }
    });
    res.json(connection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyStudents = async (req, res) => {
  const ustazId = req.user.id;
  try {
    const connections = await prisma.connection.findMany({
      where: {
        ustazId: ustazId,
        status: 'ACCEPTED'
      },
      include: {
        student: true
      }
    });

    // Add unread count for each student
    const studentsWithCount = await Promise.all(connections.map(async (conn) => {
      const unreadCount = await prisma.message.count({
        where: {
          senderId: conn.student.id,
          receiverId: ustazId,
          isRead: false
        }
      });
      return { ...conn.student, unreadCount };
    }));

    res.json(studentsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyUstazs = async (req, res) => {
  const studentId = req.user.id;
  try {
    const connections = await prisma.connection.findMany({
      where: {
        studentId: studentId,
        status: 'ACCEPTED'
      },
      include: {
        ustaz: true
      }
    });

    // Add unread count for each ustaz
    const ustazsWithCount = await Promise.all(connections.map(async (conn) => {
      const unreadCount = await prisma.message.count({
        where: {
          senderId: conn.ustaz.id,
          receiverId: studentId,
          isRead: false
        }
      });
      return { ...conn.ustaz, unreadCount };
    }));

    res.json(ustazsWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyConnections = async (req, res) => {
  const userId = req.user.id;
  try {
    const connections = await prisma.connection.findMany({
      where: {
        studentId: userId
      }
    });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getPublicUstazs = async (req, res) => {
  try {
    const ustazs = await prisma.user.findMany({
      where: { role: 'USTAZ' },
      select: {
        id: true,
        name: true,
        photoUrl: true,
        bio: true,
        location: true,
        educationLevel: true,
        _count: {
          select: {
            ustazConnections: { where: { status: 'ACCEPTED' } },
            timeSlots: { where: { isBooked: false } }
          }
        }
      }
    });

    const formattedUstazs = ustazs.map(u => ({
      ...u,
      studentCount: u._count.ustazConnections,
      freeSlots: u._count.timeSlots
    }));

    res.json(formattedUstazs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProfile, getProfile, getUstazList, requestUstaz, getPendingRequests, handleRequest, getMyStudents, getMyUstazs, getMyConnections, getPublicUstazs, revertProfilePhoto };
