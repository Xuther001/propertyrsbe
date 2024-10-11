import models from '../index.js';
import FavoriteService from '../service/FavoriteService.js';

const { User, Property, Listing, Favorite } = models;

export const getAllFavorites = async (req, res) => {
    try {

        // const favorite = await Favorite.findOne({
        //     where: { }
        // })

        if (String(req.user.user_id) != String(req.body.user_id)) {
            return res.status(403).json({ message: 'Request user_id does not match with favorite user_id' });
        }

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

        if (String(req.user.user_id) != String(user_id)) {
            return res.status(403).json({ message: 'Request user_id does not match with favorite user_id' });
        }

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

        //logic

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