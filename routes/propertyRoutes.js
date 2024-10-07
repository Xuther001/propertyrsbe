import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import PropertyService from '../service/PropertyService.js';

const { createProperty, getPropertyById, getPropertyByIdAdmin, getAllProperties, editProperty } = PropertyService;

const router = express.Router();

router.post('/', authenticateToken, createProperty); //works

router.get('/', getAllProperties); //works

router.get('/:propertyId', authenticateToken, getPropertyById);

router.put('/:propertyId', authenticateToken, editProperty);

export default router;