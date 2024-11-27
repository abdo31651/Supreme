const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    confirmPassword: {
        type: String,
        required: true,
    },

    role: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },

    academicStage: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicStage',
    },

    academicYear: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicYear',
    },

    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    }],

    progress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'progress',
    }],

}, {
    timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
