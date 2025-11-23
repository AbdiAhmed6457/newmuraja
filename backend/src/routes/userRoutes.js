const express = require('express');
const { updateProfile, getProfile, getUstazList, requestUstaz, getPendingRequests, handleRequest, getMyStudents, getMyUstazs, getMyConnections } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', upload.single('photo'), updateProfile);
router.get('/ustaz', getUstazList);
router.post('/request-ustaz', requestUstaz);
router.get('/pending-requests', getPendingRequests);
router.put('/handle-request', handleRequest);
router.get('/my-students', getMyStudents);
router.get('/my-ustazs', getMyUstazs);
router.get('/my-connections', getMyConnections);

module.exports = router;
