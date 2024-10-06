import models from '../index.js';

const { Property } = models;

const createProperty = async (req, res) => {
    // Extract propertyData from the request body
    const propertyData = req.body; 
    // Extract userId from the authenticated user (assuming it's set by your middleware)
    const userId = req.user.user_id; 

    try {
        // Create a new property with the property data and user_id
        const newProperty = await Property.create({ ...propertyData, user_id: userId });
        // Respond with the created property
        return res.status(201).json({ property: newProperty });
    } catch (error) {
        // Handle error and respond with a meaningful message
        return res.status(500).json({ message: 'Failed to create property: ' + error.message });
    }
};

export default { createProperty };

//create property
//get all properties
//get property by id
//delete property
//edit property