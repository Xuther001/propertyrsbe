import express from 'express';
import FavoriteController from '../controllers/FavoriteController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, FavoriteController.getAllFavorites);
router.get('/:id', authenticateToken, FavoriteController.getFavoriteById);
router.post('/', authenticateToken, FavoriteController.createFavorite);
router.delete('/:id', authenticateToken, FavoriteController.deleteFavorite);

export default router;