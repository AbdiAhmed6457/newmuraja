const prisma = require('../prismaClient');

const markAttendance = async (req, res) => {
    const { studentId, status, remarks, date } = req.body;
    const ustazId = req.user.id;
    try {
        const attendance = await prisma.attendance.create({
            data: {
                studentId,
                ustazId,
                status,
                remarks,
                date: date ? new Date(date) : new Date()
            }
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAttendance = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;
    try {
        const where = role === 'STUDENT' ? { studentId: userId } : { ustazId: userId };
        const include = role === 'STUDENT'
            ? { ustaz: { select: { name: true } } }
            : { student: { select: { name: true } } };

        const attendance = await prisma.attendance.findMany({
            where,
            include,
            orderBy: { date: 'desc' }
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { markAttendance, getAttendance };
