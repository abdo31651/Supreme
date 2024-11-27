const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['read', 'write', 'delete'],
    },
    resources: {
        Course: {
            type: Boolean,
            default: false,
        },
        Exam: {
            type: Boolean,
            default: false,
        },
        User: {
            type: Boolean,
            default: false,
        },
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const permissions = mongoose.model('permission', PermissionsSchema);

module.exports = permissions;
