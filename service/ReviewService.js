import models from '../index.js';

const { Review, User, Property } = models;

export const createReview = async (reviewData) => {
    try {
        const review = await Review.create(reviewData);
        return review;
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Error creating review: ' + (error.message || 'Unknown error') });
    }
};


export const editReview = async (reviewId, updatedData) => {
    try {
        await Review.update(updatedData, { where: { review_id: reviewId } });
    } catch (error) {
        throw new Error('Error editing review: ' + error.message);
    }
}

export const deleteReview = async (reviewId) => {
    try {
        await Review.destroy({where: { review_id: reviewId}});
    } catch (error) {
        throw new Error('Error deleting review: ' + error.message);
    }
}

export default { createReview, editReview, deleteReview };