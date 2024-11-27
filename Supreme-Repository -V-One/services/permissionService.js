const PermissionModel = require('../models/permission');

class PermissionService {
    // [1] Create a new permission
    async createPermission(data) {
        const permission = new PermissionModel(data);
        return await permission.save();
    }

    // [2] Get all permissions
    async getAllPermissions() {
        return await PermissionModel.find();
    }

    // [3] Get a permission by ID
    async getPermissionById(id) {
        return await PermissionModel.findById(id);
    }

    // [4] Update a permission by ID
    async updatePermission(id, data) {
        //new will give you the object after update was applied.
        return await PermissionModel.findByIdAndUpdate(id, data, { new: true });
    }

    // [5] Delete a permission by ID
    async deletePermission(id) {
        return await PermissionModel.findByIdAndDelete(id);
    }
}

module.exports = new PermissionService();
