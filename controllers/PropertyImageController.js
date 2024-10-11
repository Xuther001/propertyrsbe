import PropertyImageService from '../service/PropertyImageService.js';

export const addPropertyImage = async (req, res) => {
    const { propertyId } = req.params;
    const imageFiles = req.files;

    try {
        const addedImages = await PropertyImageService.addPropertyImages(propertyId, imageFiles);
        return res.status(201).json({ images: addedImages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPropertyImages = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const images = await PropertyImageService.getPropertyImages(propertyId);
        return res.status(200).json({ images });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePropertyImage = async (req, res) => {
    const { propertyId, imageId } = req.params;

    try {
        const deleted = await PropertyImageService.deletePropertyImage(propertyId, imageId);
        if (!deleted) {
            return res.status(404).json({ message: 'Image not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { addPropertyImage, getPropertyImages, deletePropertyImage };