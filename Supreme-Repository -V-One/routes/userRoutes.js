const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Authenticated routes
router.put('/me', authMiddleware, userController.updateMyProfile); // Place this above `/:id`
router.get('/me', authMiddleware, userController.getMyProfile);    // Place this above `/:id`
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/role/:role', authMiddleware, userController.getUsersByRole);

// Admin-only routes
router.put('/:id', authMiddleware, userController.updateUser);
router.put('/:id/role', authMiddleware, userController.assignRole);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
