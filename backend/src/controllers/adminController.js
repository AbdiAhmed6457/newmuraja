const prisma = require('../prismaClient');

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, category: true, assignedUstazId: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignUstaz = async (req, res) => {
    const { studentId, ustazId } = req.body;
    try {
        const student = await prisma.user.update({
            where: { id: parseInt(studentId) },
            data: { assignedUstazId: parseInt(ustazId) }
        });
        res.json({ message: 'Ustaz assigned successfully', student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, deleteUser, assignUstaz };
