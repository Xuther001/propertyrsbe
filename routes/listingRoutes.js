import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createListing, getAllListings, getListingById, updateListing, deleteListing } from '../controllers/ListingController.js';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', getAllListings);
router.get('/:id', authenticateToken, getListingById);
router.put('/:id', authenticateToken, updateListing);
router.delete('/:id', authenticateToken, deleteListing);

export default router;