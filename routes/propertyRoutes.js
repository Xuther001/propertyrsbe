import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/PropertyController.js';

const router = express.Router();

router.post('/', authenticateToken, createProperty); //works

router.get('/', getAllProperties); //works

router.get('/:propertyId', authenticateToken, getPropertyById);

router.put('/:propertyId', authenticateToken, updateProperty);

router.delete('/:propertyId', authenticateToken, deleteProperty);

export default router;