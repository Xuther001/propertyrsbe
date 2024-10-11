import models from '../index.js';
import FavoriteService from '../service/FavoriteService.js';

const { User, Property, Listing } = models;

export const getAllFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteService.getAllFavorites(req.user.user_id);
        return res.status(200).json({ favorites });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getFavoriteById = async (req, res) => {
    try {
        const favorite = await FavoriteService.getFavoriteById(req.user.user_id, req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        return res.status(200).json({ favorite });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createFavorite = async (req, res) => {
    try {
        const { user_id, property_id, listing_id } = req.body;

        const user = await User.findByPk(user_id);
        const property = await Property.findByPk(property_id);
        const listing = await Listing.findByPk(listing_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!property && !listing) {
            return res.status(404).json({ message: 'Either property or listing must exist' });
        }

        const favorite = await FavoriteService.createFavorite(req.body);
        return res.status(201).json({ favorite });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating favorite: ' + error.message });
    }
};

export const deleteFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteService.getFavoriteById(req.user.user_id, req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await FavoriteService.deleteFavorite(favorite.favorite_id);
        return res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { getAllFavorites, getFavoriteById, createFavorite, deleteFavorite };