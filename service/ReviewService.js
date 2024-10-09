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


export const editReview = async (editReviewId) => {
    try {
        const existingReview = await Review.findOne({ where: { id: editReviewId } });

        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await Review.update(editReviewId, { where: { id: editReviewId } });

        const updatedReview = await Review.findOne({ where: { id: editReviewId } });
        return res.status(200).json({ review: updatedReview });
    } catch (error) {
        return res.status(500).json({ message: 'Error editing review: ' + error.message });
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