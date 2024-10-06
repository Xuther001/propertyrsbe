import models from '../index.js';
import PropertyService from '../service/PropertyService.js';

const { Property } = models;

export const createProperty = async (propertyData) => {
    try {
        const newProperty = PropertyService.createProperty(propertyData);
    } catch {
        return res.status(500).json({ message: error.message });
    }
}
