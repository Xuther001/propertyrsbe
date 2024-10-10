import models from '../index.js';

const { Listing } = models;

const createListing = async (listingData) => {
    try {
        const newListing = await Listing.create(listingData);
        return newListing;
    } catch (error) {
        throw new Error('Error creating listing: ' + error.message);
    }
};

const getAllListings = async () => {
    try {
        const listings = await Listing.findAll();
        return listings;
    } catch (error) {
        throw new Error('Error fetching listings: ' + error.message);
    }
};

const getListingById = async (listingId) => {
    try {
        const listing = await Listing.findByPk(listingId);
        return listing;
    } catch (error) {
        throw new Error('Error fetching listing by ID: ' + error.message);
    }
};

const updateListing = async (listingId, updateData) => {
    try {
        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return null;
        }
        const updatedListing = await listing.update(updateData);
        return updatedListing;
    } catch (error) {
        throw new Error('Error updating listing: ' + error.message);
    }
};

const deleteListing = async (listingId) => {
    try {
        const listing = await Listing.findByPk(listingId);
        if (!listing) {
            return null;
        }
        await listing.destroy();
    } catch (error) {
        throw new Error('Error deleting listing: ' + error.message);
    }
};

export default {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
};