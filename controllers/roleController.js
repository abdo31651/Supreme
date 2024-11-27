const RoleService = require('../services/roleService');
const mongoose = require('mongoose');

class RoleController {
    // Create Role
    async createRole(req, res) {
        try {
            const { name, permissions } = req.body;

            // Validate and convert `permissions` to ObjectId
            const castedPermissions = permissions.map((permissionId) => {
                if (!mongoose.Types.ObjectId.isValid(permissionId)) {
                    throw new Error(`Invalid ObjectId: ${permissionId}`);
                }
                return new mongoose.Types.ObjectId(permissionId);
            });

            // Create the role
            const role = await RoleService.createRole({ name, permissions: castedPermissions });

            res.status(201).json({
                message: 'Role created successfully',
                role,
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message || 'Failed to create role' });
        }
    }

    // Get All Roles
    async getAllRoles(req, res) {
        try {
            const roles = await RoleService.getAllRoles();
            res.status(200).json({
                message: 'Roles retrieved successfully',
                roles,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to fetch roles' });
        }
    }

    // Get Role by ID
    async getRoleById(req, res) {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(id);

            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }

            res.status(200).json({
                message: 'Role retrieved successfully',
                role,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to fetch role' });
        }
    }

    // Update Role
    async updateRole(req, res) {
        try {
            const { id } = req.params; // Role ID
            const { name, permissions } = req.body;

            // Validate Role ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid Role ID' });
            }

            // Validate and convert `permissions` to ObjectId
            const castedPermissions = permissions.map((permissionId) => {
                if (!mongoose.Types.ObjectId.isValid(permissionId)) {
                    throw new Error(`Invalid ObjectId: ${permissionId}`);
                }
                return new mongoose.Types.ObjectId(permissionId);
            });

            // Update the role
            const updatedRole = await RoleService.updateRole(id, { name, permissions: castedPermissions });

            if (!updatedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }

            res.status(200).json({
                message: 'Role updated successfully',
                role: updatedRole,
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message || 'Failed to update role' });
        }
    }

    // Delete Role
    async deleteRole(req, res) {
        try {
            const { id } = req.params;

            const deletedRole = await RoleService.deleteRole(id);

            if (!deletedRole) {
                return res.status(404).json({ message: 'Role not found' });
            }

            res.status(200).json({
                message: 'Role deleted successfully',
                role: deletedRole,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to delete role' });
        }
    }
}

module.exports = new RoleController();
