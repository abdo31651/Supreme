const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');

// Create Permission
router.post('/create', PermissionController.createPermission);

// Get All Permissions
router.get('/', PermissionController.getAllPermissions);

// Get Permission by ID
router.get('/:id', PermissionController.getPermissionById);

// Update Permission by ID
router.put('/:id', PermissionController.updatePermission);

// Delete Permission by ID
router.delete('/:id', PermissionController.deletePermission);

module.exports = router;
