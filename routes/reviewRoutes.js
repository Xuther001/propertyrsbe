import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
// import { getAllReview, getReviewById, createReview, editReview, deleteReview } from '../controllers/ReviewController.js';

import { createReview, editReview, deleteReview } from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', authenticateToken, createReview);

// router.get('/', getAllReview);

// router.get('/:id', getReviewById);

router.put('/:id', editReview); //done

router.delete('/:id', authenticateToken, deleteReview);

export default router;