const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const user = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
                if (err) reject(err);
                resolve(decodedUser);
            });
        });

        req.user = user;

        // Update lastSeen
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { lastSeen: new Date() }
            });
        } catch (updateError) {
            if (updateError.code === 'P2025') {
                // User not found in DB (e.g. DB reset), invalidate token
                return res.status(401).json({ error: 'User not found' });
            }
            console.error("Failed to update lastSeen:", updateError);
            // Continue even if update fails for other reasons
        }

        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRole };
