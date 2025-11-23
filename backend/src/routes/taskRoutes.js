const express = require('express');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', authorizeRole(['USTAZ']), createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);

module.exports = router;
