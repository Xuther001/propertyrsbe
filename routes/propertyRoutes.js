import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { authenticateToken } from '../middleware/auth.js';
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/PropertyController.js';

const router = express.Router();
const upload = multer();

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  region: process.env.YOUR_AWS_REGION,
});

router.post('/', authenticateToken, createProperty); // works
router.get('/', getAllProperties); // works
router.get('/:propertyId', authenticateToken, getPropertyById);
router.put('/:propertyId', authenticateToken, updateProperty);
router.delete('/:propertyId', authenticateToken, deleteProperty);

router.post('/:propertyId/images', authenticateToken, upload.array('images'), async (req, res) => {
    const propertyId = req.params.propertyId;
    const imageUrls = [];
  
    try {
      const uploadPromises = req.files.map((file) => {
        const params = {
          Bucket: 'YOUR_BUCKET_NAME',
          Key: `images/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
  
        return s3.upload(params).promise();
      });
  
      const results = await Promise.all(uploadPromises);
      results.forEach(result => {
        imageUrls.push(result.Location);
      });
  
      const addedImages = await PropertyImageService.addPropertyImages(propertyId, results);
  
      res.status(201).json({ message: 'Images uploaded successfully', images: addedImages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading images', error: error.message });
    }
  });

export default router;