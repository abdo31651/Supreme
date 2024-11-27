const UserService = require('../services/userServices');

const express = require('express');
const mongoose = require('mongoose');

class UserController {
    async registerUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserService.registerUser(userData);
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const result = await UserService.loginUser(email, password);
            res.status(200).json({
                message: 'Login successful',
                token: result.token,
                user: result.user,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            res.status(200).json({
                message: 'User retrieved successfully',
                user,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                message: 'Users retrieved successfully',
                users,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedUser = await UserService.updateUser(id, updateData);
            res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await UserService.deleteUser(id);
            res.status(200).json({
                message: 'User deleted successfully',
                user: deletedUser,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getMyProfile(req, res) {
        try {
            const userId = req.user.id;
            const user = await UserService.getMyProfile(userId);
            res.status(200).json({
                message: 'Profile retrieved successfully',
                user,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getUsersByRole(req, res) {
        try {
            const { role } = req.params;
            const users = await UserService.getUsersByRole(role);
            res.status(200).json({
                message: 'Users retrieved successfully',
                users,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async assignRole(req, res) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const updatedUser = await UserService.assignRole(id, role);
            res.status(200).json({
                message: 'Role assigned successfully',
                user: updatedUser,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }


    async updateMyProfile(req, res) {
        try {
            const userId = req.user.id; // Extract user ID from the JWT payload
            const updateData = req.body; // Data to update
    
            const updatedUser = await UserService.updateMyProfile(userId, updateData);
            res.status(200).json({
                message: 'Profile updated successfully',
                user: updatedUser,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
