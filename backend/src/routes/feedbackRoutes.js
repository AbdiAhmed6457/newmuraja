const express = require('express');
const { createFeedback, createComplaint } = require('../controllers/feedbackController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole(['STUDENT']));

router.post('/feedback', createFeedback);
router.post('/complaint', createComplaint);

module.exports = router;
