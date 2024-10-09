import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, updateUser, patchUser } from '../controllers/UserController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/getallusers', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.delete('/:id', authenticateToken, deleteUser);
router.put('/:id', authenticateToken, updateUser);
router.patch('/:id', authenticateToken, patchUser);
// router.post('/login', )


export default router;