const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');

// Create Role
router.post('/create', RoleController.createRole);

// Get All Roles
router.get('/', RoleController.getAllRoles);

// Get Role by ID
router.get('/:id', RoleController.getRoleById);

// Update Role by ID
router.put('/:id', RoleController.updateRole);

// Delete Role by ID
router.delete('/:id', RoleController.deleteRole);

module.exports = router;
