import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createListing, getAllListings, getListingById, updateListing, deleteListing } from '../controllers/ListingController.js';

const router = express.Router();

router.post('/', authenticateToken, createListing);
router.get('/', getAllListings);
router.get('/:listingId', authenticateToken, getListingById);
router.put('/:listingId', authenticateToken, updateListing);
router.delete('/:listingId', authenticateToken, deleteListing);

export default router;