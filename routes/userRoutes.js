import express from 'express';
import { getAllUsers, getUserById, registerUser, deleteUser, updateUser, patchUser } from '../controllers/UserController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/getallusers', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, deleteUser);
router.put('/:id', authenticateToken, updateUser); //update checks for user updating their own info done
router.patch('/:id', authenticateToken, patchUser);
// router.post('/login', ) //will be in auth


export default router;