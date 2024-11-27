const PermissionService = require('../services/permissionService');
const mongoose = require('mongoose');

class PermissionController {
    // Create a new permission
    async createPermission(req, res) {
        try {
            const { name, resources } = req.body;

            if (!['read', 'write', 'delete'].includes(name)) {
                return res.status(400).json({ message: 'Invalid permission name' });
            }

            const permission = await PermissionService.createPermission({ name, resources });
            res.status(201).json({
                message: 'Permission created successfully',
                permission,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to create permission' });
        }
    }

    // Get all permissions
    async getAllPermissions(req, res) {
        try {
            const permissions = await PermissionService.getAllPermissions();
            res.status(200).json({
                message: 'Permissions retrieved successfully',
                permissions,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to retrieve permissions' });
        }
    }

    // Get a specific permission by ID
    async getPermissionById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const permission = await PermissionService.getPermissionById(id);
            if (!permission) {
                return res.status(404).json({ message: 'Permission not found' });
            }

            res.status(200).json({
                message: 'Permission retrieved successfully',
                permission,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to retrieve permission' });
        }
    }

    // Update a permission by ID
    async updatePermission(req, res) {
        try {
            const { id } = req.params;
            const { name, resources } = req.body;

            if (name && !['read', 'write', 'delete'].includes(name)) {
                return res.status(400).json({ message: 'Invalid permission name' });
            }

            const updatedPermission = await PermissionService.updatePermission(id, { name, resources });

            if (!updatedPermission) {
                return res.status(404).json({ message: 'Permission not found' });
            }

            res.status(200).json({
                message: 'Permission updated successfully',
                permission: updatedPermission,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to update permission' });
        }
    }

    // Delete a permission by ID
    async deletePermission(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const deletedPermission = await PermissionService.deletePermission(id);

            if (!deletedPermission) {
                return res.status(404).json({ message: 'Permission not found' });
            }

            res.status(200).json({
                message: 'Permission deleted successfully',
                permission: deletedPermission,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to delete permission' });
        }
    }
}

module.exports = new PermissionController();
