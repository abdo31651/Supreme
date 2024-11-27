const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission', // Reference to the Permissions model
    }],

}, {
    timestamps: true,  // Correct placement of timestamps option
});

const role = mongoose.model('role', RoleSchema);

module.exports = role;
