import models from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const { Review } = models;

const createReview = async (userId, reviewData) => {
    try {
        // if userId matches with reviewData's userId then save if not message that user can only review with their id
        const review = await Review.create(reviewData);
        return { review: review };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const editReview = async (userId, reviewId, editReviewData) => {
    try {

        //add logic to check userId with database's review's userId
        //if the above matches then edit the review
        const editReview = await Review.update(editReviewData);
        return { review: editReview };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

const deleteReview = async (userId, reviewId) => {
    try {

        //check token to see if request userId param matches with userId in token
        const review = await Review.findByPk(reviewId);
        await user.destroy();
        return true;
    } catch (error) {
        throw new Error('Error deleting review: ' + error.message);
    }
}

export default { createReview, editReview, deleteReview };