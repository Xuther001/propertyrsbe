import express from 'express';
import { getAllFavorites, getFavoriteById, createFavorite, deleteFavorite } from '../controllers/FavoriteController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllFavorites);
router.get('/:id', authenticateToken, getFavoriteById);
router.post('/', authenticateToken, createFavorite);
router.delete('/:id', authenticateToken, deleteFavorite);

export default router;