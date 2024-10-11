import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { addPropertyImage, getPropertyImages, deletePropertyImage } from '../controllers/PropertyImageController.js';

const router = express.Router();

router.post('/:propertyId/images', authenticateToken, addPropertyImage);
router.get('/:propertyId/images', getPropertyImages);
router.delete('/:propertyId/images/:imageId', authenticateToken, deletePropertyImage);

export default router;