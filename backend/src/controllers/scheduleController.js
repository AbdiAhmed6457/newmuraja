const prisma = require('../prismaClient');

const createTimeSlot = async (req, res) => {
    const { day, startTime, endTime } = req.body;
    const ustazId = req.user.id;
    try {
        const timeSlot = await prisma.timeSlot.create({
            data: { day, startTime, endTime, ustazId }
        });
        res.status(201).json(timeSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTimeSlots = async (req, res) => {
    const { ustazId } = req.query;
    try {
        const where = ustazId ? { ustazId: parseInt(ustazId) } : {};
        const timeSlots = await prisma.timeSlot.findMany({ where });
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTimeSlot = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.timeSlot.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Time slot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTimeSlot, getTimeSlots, deleteTimeSlot };
