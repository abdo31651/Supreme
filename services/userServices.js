const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    // Register a new user
    async registerUser(userData) {
        const { firstName, lastName, userName, email, password, confirmPassword, role, academicStage, academicYear } = userData;

        // Validate required fields
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !role || !academicStage || !academicYear) {
            throw new Error('All fields are required');
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            confirmPassword,
            role,
            academicStage,
            academicYear,
        });

        // Save user to the database
        return await newUser.save();
    }

    // Login user
    async loginUser(email, password) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET, // Secret key loaded from .env
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Expiry time
        );
        return { token, user };
    }

    // Get user by ID
    async getUserById(id) {
        const user = await UserModel.findById(id).populate(['role', 'academicStage', 'academicYear']);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Get all users
    async getAllUsers() {
        return await UserModel.find().populate(['role', 'academicStage', 'academicYear']);
    }

    // Update user
    async updateUser(id, updateData) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }

    // Delete user
    async deleteUser(id) {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    }

    // Get logged-in user's profile
    async getMyProfile(userId) {
        const user = await UserModel.findById(userId).populate(['role', 'academicStage', 'academicYear']);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    // Get users by role
    async getUsersByRole(role) {
        return await UserModel.find({ role }).populate(['role', 'academicStage', 'academicYear']);
    }

    // Assign role to user
    async assignRole(userId, roleId) {
        const user = await UserModel.findByIdAndUpdate(userId, { role: roleId }, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }


    async updateMyProfile(userId, updateData) {
        const { password, confirmPassword, ...otherFields } = updateData;
    
        // If password is provided, validate and hash it
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            otherFields.password = await bcrypt.hash(password, 10);
        }
    
        // Update the user's profile
        const updatedUser = await UserModel.findByIdAndUpdate(userId, otherFields, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }


}

module.exports = new UserService();
