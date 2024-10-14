import models from '../index.js';
import UserProperty from '../models/UserProperty.js';

const { User, Property } = models;

const createProperty = async (propertyData, userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const newProperty = await Property.create(propertyData);
    await newProperty.addUser(user);
    return newProperty;
};

const getAllProperties = async () => {
    return await Property.findAll({
        include: {
            model: models.PropertyImage,
            as: 'images',
            attributes: ['image_url']
        },
    });
};

const getPropertyById = async (userId, propertyId) => {
    const ownership = await UserProperty.findOne({
        where: { user_id: userId, property_id: propertyId },
    });

    if (!ownership) throw new Error('User does not own this property');

    const property = await Property.findOne({
        where: { property_id: propertyId },
        include: {
            model: models.PropertyImage,
            as: 'images',
            attributes: ['image_url'],
        },
    });

    if (!property) throw new Error('Property not found');

    return property;
};

const updateProperty = async (propertyId, updateData) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new Error('Property not found');

    await property.update(updateData);
    return property;
};

const deleteProperty = async (userId, propertyId) => {
    const ownership = await UserProperty.findOne({
        where: { user_id: userId, property_id: propertyId }
    });

    if (!ownership) throw new Error('User does not have permission to delete this property');

    const property = await Property.findByPk(propertyId);
    if (!property) throw new Error('Property not found');

    await property.destroy();
    return true;
};

export default { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty };