const prisma = require('../prismaClient');

const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;
  const file = req.file;

  try {
    const messageData = {
      senderId,
      receiverId: parseInt(receiverId),
      content: content || '', // Content might be empty if sending just a file
    };

    if (file) {
      messageData.attachmentUrl = `/uploads/${file.filename}`;
      messageData.attachmentType = file.mimetype.startsWith('image/') ? 'IMAGE' : 'FILE';
    }

    const message = await prisma.message.create({
      data: messageData,
      include: { sender: true }
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' },
      include: { sender: true }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  const userId = req.user.id;
  const { senderId } = req.body;

  try {
    await prisma.message.updateMany({
      where: {
        senderId: parseInt(senderId),
        receiverId: userId,
        isRead: false
      },
      data: { isRead: true }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUnreadCount = async (req, res) => {
  const userId = req.user.id;
  try {
    const count = await prisma.message.count({
      where: {
        receiverId: userId,
        isRead: false
      }
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const message = await prisma.message.findUnique({ where: { id: parseInt(id) } });

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (message.senderId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this message' });
    }

    await prisma.message.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, id: parseInt(id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage, getMessages, markAsRead, getUnreadCount, deleteMessage };
