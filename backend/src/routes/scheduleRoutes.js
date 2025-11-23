const express = require('express');
const { createTimeSlot, getTimeSlots, deleteTimeSlot } = require('../controllers/scheduleController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', authorizeRole(['USTAZ']), createTimeSlot);
router.get('/', getTimeSlots);
router.delete('/:id', authorizeRole(['USTAZ']), deleteTimeSlot);

module.exports = router;
