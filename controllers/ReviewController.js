import models from '../index.js';
import ReviewService from '../service/ReviewService.js';

const { Review, User, Property } = models;

export const getAllReview = async () => {
    try {
        const reviews = await Review.findAll();
        return { review: reviews };
    } catch {
        return res.status(500).json({ message: error.message });
    }
}

export const getReviewById = async (userId, reviewId) => {
    try {
        const review = Review.getReviewById(reviewId);
        return { review: review };
    } catch {
        return res.status(500).json({ message: error.message });
    }
}

export const createReview = async (req, res) => {
    try{
        const { user_id, property_id, ...reviewData } = req.body;
        const property = await Property.findByPk(property_id);
        const user = await User.findByPk(user_id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (String(req.user.user_id) !== String(user_id)) {
            return res.status(403).json({ message: 'You can only create a review using your own user ID' });
        }

        const review = await ReviewService.createReview(req.body);
        return res.status(201).json({ review });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating review: ' + error.message });
    }
};

export const editReview = async (req, res) => {
    try {
        const review = await Review.findOne({ 
            where: { 
                user_id: req.user.user_id, 
                property_id: req.body.property_id 
            }
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (String(req.user.user_id) !== String(review.user_id)) {
            return res.status(403).json({ message: 'You can only edit your own review' });
        }

        const updatedData = {
            rating: req.body.rating,
            comment: req.body.comment
        };

        await ReviewService.editReview(review.review_id, updatedData);

        const updatedReview = await Review.findOne({ where: { review_id: review.review_id } });

        return res.status(200).json({ review: updatedReview });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({where: { user_id: req.user.user_id, property_id: req.body.property_id }});
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await ReviewService.deleteReview(review.review_id);
        return res.status(200).json({ message: review})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { getAllReview, getReviewById, createReview, editReview, deleteReview };