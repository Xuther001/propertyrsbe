import models from '../index.js';
import UserService from '../service/UserService.js';

const { User } = models;

export const registerUser = async (req, res) => {
    try {
        const newUser = await UserService.createUser(req.body);
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id; // Get userId from request parameters
    try {
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id; // Get userId from request parameters
    const updateData = req.body;   // Get update data from request body
    try {
        const updatedUser = await UserService.updateUser(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const patchUser = async (req, res) => {
    const userId = req.params.id; // Get userId from request parameters
    const patchData = req.body;    // Get patch data from request body
    try {
        const patchedUser = await UserService.patchUser(userId, patchData);
        if (!patchedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(patchedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id; // Get userId from request parameters
    try {
        const deleted = await UserService.deleteUser(userId);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(204).send(); // No content to send back
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};