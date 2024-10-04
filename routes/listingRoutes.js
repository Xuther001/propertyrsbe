import express from 'express';
import models from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const { Listing } = models;
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { price, is_for_sale, description, available_from, property_id } = req.body;

    const newListing = await Listing.create({
      price,
      is_for_sale,
      description,
      available_from,
      property_id,
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Error creating listing' });
  }
});

router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Error fetching listing' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { price, is_for_sale, description, available_from } = req.body;

    const listing = await Listing.findByPk(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.price = price !== undefined ? price : listing.price;
    listing.is_for_sale = is_for_sale !== undefined ? is_for_sale : listing.is_for_sale;
    listing.description = description !== undefined ? description : listing.description;
    listing.available_from = available_from !== undefined ? available_from : listing.available_from;

    await listing.save();

    res.status(200).json(listing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ message: 'Error updating listing' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    await listing.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Error deleting listing' });
  }
});

export default router;