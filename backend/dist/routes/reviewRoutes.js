"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewsControllers_1 = require("../controllers/reviewsControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const reviewRouter = (0, express_1.Router)();
// Create a new review
reviewRouter.post('/', reviewsControllers_1.createReview);
// Get all reviews
reviewRouter.get('/allReviews', verifyToken_1.verifyToken, reviewsControllers_1.getAllReviews);
// Get a specific review by ID
reviewRouter.get('/:review_id', verifyToken_1.verifyToken, reviewsControllers_1.getReviewById);
// Update a review by ID
reviewRouter.put('/:review_id', verifyToken_1.verifyToken, reviewsControllers_1.updateReview);
// Delete a review by ID
reviewRouter.delete('/:review_id', verifyToken_1.verifyToken, reviewsControllers_1.deleteReview);
exports.default = reviewRouter;
