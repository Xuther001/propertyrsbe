import models from '../index.js';

const { PropertyImage, Property } = models;

const addPropertyImages = async (propertyId, imageFiles) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new Error('Property not found');

    const imagesToCreate = imageFiles.map((file) => ({
        property_id: propertyId,
        image_url: file.url,
        image_type: file.type || 'gallery',
    }));

    const addedImages = await PropertyImage.bulkCreate(imagesToCreate);
    return addedImages;
};

const getPropertyImages = async (propertyId) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new Error('Property not found');

    const images = await PropertyImage.findAll({
        where: { property_id: propertyId },
    });

    return images;
};

const deletePropertyImage = async (propertyId, imageId) => {
    const property = await Property.findByPk(propertyId);
    if (!property) throw new Error('Property not found');

    const image = await PropertyImage.findOne({
        where: {
            property_id: propertyId,
            image_id: imageId,
        },
    });

    if (!image) return false;

    await image.destroy();
    return true;
};

export default { addPropertyImages, getPropertyImages, deletePropertyImage };