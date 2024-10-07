import PropertyService from '../service/PropertyService.js';

export const createProperty = async (req, res) => {
    const propertyData = req.body; 
    const userId = req.user.user_id; 

    try {
        const newProperty = await PropertyService.createProperty(propertyData, userId);
        return res.status(201).json({ property: newProperty });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllProperties = async (req, res) => {
    try {
        const properties = await PropertyService.getAllProperties();
        return res.status(200).json({ properties });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPropertyById = async (req, res) => {
    const userId = req.user.user_id;
    const propertyId = req.params.propertyId;

    try {
        const property = await PropertyService.getPropertyById(userId, propertyId);
        return res.status(200).json({ property });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProperty = async (req, res) => {
    const propertyId = req.params.propertyId;
    const updateData = req.body;

    try {
        const updatedProperty = await PropertyService.updateProperty(propertyId, updateData);
        return res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    const userId = req.user.user_id;
    const propertyId = req.params.propertyId;

    try {
        const deleted = await PropertyService.deleteProperty(userId, propertyId);
        if (!deleted) {
            return res.status(404).json({ message: 'Property not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty };
