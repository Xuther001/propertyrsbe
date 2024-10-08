import models from '../index.js';

const { Review } = models;

const createReview = async (req, res) => {
    try {

        const { user_id } = req.body;
        const reviewData = req.body;

        if (String(req.user.user_id) !== String(user_id)) {
            return res.status(403).json({ message: 'You can only create a review using your own user ID' });
        }

        const review = await Review.create(reviewData);

        return res.status(201).json({ review });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating review: ' + error.message });
    }
};

const editReview = async (req, res) => {
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

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params;
        const review = await Review.findByPk(reviewId);
        await user.destroy();
        return true;
    } catch (error) {
        throw new Error('Error deleting review: ' + error.message);
    }
}

export default { createReview, editReview, deleteReview };