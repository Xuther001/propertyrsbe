import express from 'express';
import bcrypt from 'bcryptjs'; //will be in auth
import jwt from 'jsonwebtoken'; //will be in auth
import models from '../index.js';
import { getAllUsers, getUserById, registerUser, deleteUser, updateUser, patchUser } from '../controllers/UserController.js';


const { User } = models;

const router = express.Router();

router.post('/register', registerUser);

router.get('/getallusers', getAllUsers);

router.get('/:id',  getUserById);

router.delete('/:id', deleteUser);

router.put('/:id',  updateUser);

router.patch('/:id', patchUser);

// router.post('/login', ) //will be in auth

export default router;

// registerUser,
// getAllUsers,
// getUserById,
// updateUser,
// patchUser,
// deleteUser
