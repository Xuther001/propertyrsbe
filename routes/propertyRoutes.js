import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import PropertyService from '../service/PropertyService.js';

const { createProperty } = PropertyService;

const router = express.Router();

router.post('/', authenticateToken, createProperty);

export default router;