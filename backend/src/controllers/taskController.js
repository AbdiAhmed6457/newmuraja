const prisma = require('../prismaClient');

const createTask = async (req, res) => {
    const { title, description, studentId } = req.body;
    const ustazId = req.user.id;
    try {
        const task = await prisma.task.create({
            data: { title, description, studentId, ustazId }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTasks = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;
    try {
        const where = role === 'STUDENT' ? { studentId: userId } : { ustazId: userId };
        const tasks = await prisma.task.findMany({ where, include: { student: { select: { name: true } }, ustaz: { select: { name: true } } } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { isCompleted, title, description } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { isCompleted, title, description }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask };
