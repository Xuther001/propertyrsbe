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


export const editReview = async (req, res) => {
    try {
        const { reviewId, ...editReviewData } = req.body;
        const userId = req.user.user_id;

        const existingReview = await Review.findOne({ where: { id: reviewId } });

        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (String(existingReview.user_id) !== String(userId)) {
            return res.status(403).json({ message: 'You can only edit your own reviews' });
        }

        await Review.update(editReviewData, { where: { id: reviewId } });

        const updatedReview = await Review.findOne({ where: { id: reviewId } });
        return res.status(200).json({ review: updatedReview });
    } catch (error) {
        return res.status(500).json({ message: 'Error editing review: ' + error.message });
    }
}

export const deleteReview = async (reviewId) => {
    try {
        await Review.destroy({where: { review_id: reviewId}});
        return "Review with id " + reviewId + " deleted";
    } catch (error) {
        throw new Error('Error deleting review: ' + error.message);
    }
}

export default { createReview, editReview, deleteReview };