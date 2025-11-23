const prisma = require('../prismaClient');

const createFeedback = async (req, res) => {
    const { content } = req.body;
    const studentId = req.user.id;
    try {
        const feedback = await prisma.feedback.create({
            data: { content, studentId }
        });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createComplaint = async (req, res) => {
    const { content } = req.body;
    const studentId = req.user.id;
    try {
        const complaint = await prisma.complaint.create({
            data: { content, studentId }
        });
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createFeedback, createComplaint };
