import models from '../index.js';

const { User } = models;

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        const updatedUser = await user.update(updateData);
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const patchUser = async (userId, patchData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        const patchedUser = await user.update(patchData, { fields: Object.keys(patchData) });
        return patchedUser;
    } catch (error) {
        throw new Error('Error patching user: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        await user.destroy();
        return true;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    patchUser,
    deleteUser
};