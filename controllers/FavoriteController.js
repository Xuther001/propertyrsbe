import models from '../index.js';
import FavoriteService from '../service/FavoriteService.js';

const { User, Property, Listing, Favorite } = models;

export const getAllFavorites = async (req, res) => {
    try {
        const favorites = await FavoriteService.getAllFavorites(req.user.user_id);
        if (!favorites) {
            return res.status(404).json({ message: 'No favorites found for this user.' });
        }
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
        if (String(favorite.user_id) !== String(req.user.user_id)) {
            return res.status(403).json({ message: 'You do not have permission to view this favorite' });
        }
        return res.status(200).json({ favorite });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createFavorite = async (req, res) => {
    try {
        const { user_id, property_id, listing_id } = req.body;

        if (String(req.user.user_id) !== String(user_id)) {
            return res.status(403).json({ message: 'Request user_id does not match with favorite user_id' });
        }

        const user = await User.findByPk(user_id);
        const property = property_id ? await Property.findByPk(property_id) : null;
        const listing = listing_id ? await Listing.findByPk(listing_id) : null;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!property && !listing) {
            return res.status(404).json({ message: 'Either property or listing must exist' });
        }

        const existingFavorite = await Favorite.findOne({
            where: {
                user_id: user_id,
                property_id: property_id || null,
                listing_id: listing_id || null
            }
        });

        if (existingFavorite) {
            return res.status(409).json({ message: 'Favorite already exists' });
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
        if (String(favorite.user_id != String(req.user.user_id))) {
            return res.status(403).json({ message: 'Request user_id does not match with favorite user_id' });
        }
        await FavoriteService.deleteFavorite(favorite.favorite_id);
        return res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { getAllFavorites, getFavoriteById, createFavorite, deleteFavorite };