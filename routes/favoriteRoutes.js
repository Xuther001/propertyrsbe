import express from 'express';
import { Favorite, Property, User, Listing } from '../models/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { user_id, property_id, listing_id } = req.body;

    const newFavorite = await Favorite.create({
      user_id, 
      property_id, 
      listing_id,
    });

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Error adding favorite' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [
        { model: Property, as: 'property' },
        { model: Listing, as: 'listing' },
      ],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    if (favorite.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this favorite' });
    }

    await favorite.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: 'Error deleting favorite' });
  }
});

export default router;