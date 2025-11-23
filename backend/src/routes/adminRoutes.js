const express = require('express');
const { getAllUsers, deleteUser, assignUstaz } = require('../controllers/adminController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole(['ADMIN']));

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.post('/assign-ustaz', assignUstaz);

module.exports = router;
