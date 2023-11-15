import { Router } from 'express';
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewsControllers';
import { verifyToken } from '../middlewares/verifyToken';

const reviewRouter = Router();

// Create a new review
reviewRouter.post('/', createReview);

// Get all reviews
reviewRouter.get('/allReviews',verifyToken, getAllReviews);

// Get a specific review by ID
reviewRouter.get('/:review_id',verifyToken, getReviewById);

// Update a review by ID
reviewRouter.put('/:review_id',verifyToken, updateReview);

// Delete a review by ID
reviewRouter.delete('/:review_id',verifyToken, deleteReview);

export default reviewRouter;
