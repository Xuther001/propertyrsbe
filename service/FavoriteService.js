import models from '../index.js';

const { Favorite, User, Property, Listing } = models;

// Get all favorites for a user
export const getAllFavorites = async (userId) => {
    try {
        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: [
                { model: Property, required: false },
                { model: Listing, required: false },
            ],
        });
        return favorites;
    } catch (error) {
        throw new Error('Error fetching favorites: ' + error.message);
    }
};

// Get a favorite by user ID and property/listing ID
export const getFavoriteById = async (userId, id) => {
    try {
        const favorite = await Favorite.findOne({
            where: {
                user_id: userId,
                [Op.or]: [
                    { property_id: id },
                    { listing_id: id }
                ],
            },
            include: [
                { model: Property },
                { model: Listing },
            ],
        });
        return favorite;
    } catch (error) {
        throw new Error('Error fetching favorite: ' + error.message);
    }
};

// Create a new favorite
export const createFavorite = async (favoriteData) => {
    try {
        const favorite = await Favorite.create(favoriteData);
        return favorite;
    } catch (error) {
        console.error('Error creating favorite:', error);
        throw new Error('Error creating favorite: ' + (error.message || 'Unknown error'));
    }
};

// Delete a favorite
export const deleteFavorite = async (favoriteId) => {
    try {
        await Favorite.destroy({ where: { favorite_id: favoriteId } });
    } catch (error) {
        throw new Error('Error deleting favorite: ' + error.message);
    }
};

export default { getAllFavorites, getFavoriteById, createFavorite, deleteFavorite };