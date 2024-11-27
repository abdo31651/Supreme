const RoleModel = require('../models/role');

class RoleService {
    // [1] Create Role
    async createRole(data) {
        const role = new RoleModel(data);
        return await role.save();
    }

    // [2] Get All Roles
    async getAllRoles() {
        // populate Mongoose fetches the corresponding documents from the Permission collection and embeds their data in the Role document.
        return await RoleModel.find().populate('permissions');
    }

    // [3] Get Role by ID
    async getRoleById(id) {
        return await RoleModel.findById(id).populate('permissions');
    }

    // [4] Update Role by ID
    async updateRole(id, data) {
        return await RoleModel.findByIdAndUpdate(id, data, { new: true }).populate('permissions');
    }

    // [5] Delete Role by ID
    async deleteRole(id) {
        return await RoleModel.findByIdAndDelete(id);
    }
}

module.exports = new RoleService();
