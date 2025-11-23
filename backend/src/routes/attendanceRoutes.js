const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', authorizeRole(['USTAZ']), markAttendance);
router.get('/', getAttendance);

module.exports = router;
