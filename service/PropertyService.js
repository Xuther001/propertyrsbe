import models from '../index.js';
import UserProperty from '../models/UserProperty.js';

const { Property } = models;

const createProperty = async (req, res) => {
    const propertyData = req.body; 
    const userId = req.user.user_id; 

    try {
        const newProperty = await Property.create({ ...propertyData, user_id: userId });
        await newProperty.addUser(userId); //***This creates an entry in user_properties table***
        return res.status(201).json({ property: newProperty });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create property: ' + error.message });
    }
};

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll();
        return res.status(200).json(properties);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch properties: ' + error.message });
    }
};

const getPropertyByIdAdmin = async (propertyId) => {
    try {
        return Property.findByPk(propertyId);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get property with id ' + propertyId + ':' + error.message });
    }
}

const getPropertyById = async (req, res) => {
    const propertyId = req.params.propertyId; 
    const userId = req.user.user_id; 

    try {
        const ownership = await UserProperty.findOne({
            where: {
                user_id: userId,
                property_id: propertyId
            }
        });

        if (!ownership) {
            return res.status(403).json({ message: 'User does not own this property' });
        }

        const property = await Property.findOne({
            where: {
                property_id: propertyId
            }
        });

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.status(200).json({ property });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get property with id ' + propertyId + ': ' + error.message });
    }
};

const editProperty = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const propertyId = req.params.propertyId;

        // Check if the user is associated with the property in the user_properties table
        const userProperty = await UserProperty.findOne({
            where: { user_id: userId, property_id: propertyId }
        });

        if (!userProperty) {
            return res.status(404).json({ message: 'You do not have permission to edit this property or it does not exist.' });
        }

        const updatedData = req.body;
        const property = await Property.findOne({ where: { property_id: propertyId } });

        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }

        await property.update(updatedData);

        return res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to edit property with id ' + req.params.propertyId + ': ' + error.message });
    }
};

export default { createProperty, getAllProperties, getPropertyById, getPropertyByIdAdmin, editProperty };

//delete property