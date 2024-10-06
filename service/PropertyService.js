import models from '../index.js';

const { Property } = models;

const createProperty = async (req, res) => {
    const propertyData = req.body; 
    const userId = req.user.user_id; 

    try {
        // Create a new property with the property data and user_id
        const newProperty = await Property.create({ ...propertyData, user_id: userId });
        await newProperty.addUser(userId); //***This creates an entry in user_properties table***
        return res.status(201).json({ property: newProperty });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create property: ' + error.message });
    }
};

export default { createProperty };

//create property
//get all properties
//get property by id
//delete property
//edit property