const express = require('express');
const { sendMessage, getMessages, markAsRead, getUnreadCount, deleteMessage } = require('../controllers/chatController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.use(authenticateToken);

router.post('/send', upload.single('file'), sendMessage);
router.get('/unread/count', getUnreadCount);
router.get('/:otherUserId', getMessages);
router.put('/read', markAsRead);
router.delete('/:id', deleteMessage);

module.exports = router;
