"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewById = exports.getAllReviews = exports.createReview = void 0;
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const dbhelper = new dbhelpers_1.default;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, comment, user_id } = req.body;
        const review_id = (0, uuid_1.v4)();
        const result = yield dbhelper.execute('createReview', {
            review_id,
            rating,
            comment,
            user_id,
        });
        console.log(result);
        return res.status(200).json({
            message: 'Review created successfully',
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.createReview = createReview;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield dbhelper.execute('getAllReviewsWithUsers');
        return res.status(200).json({
            reviews: reviews.recordset,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getAllReviews = getAllReviews;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id } = req.params;
        const review = yield dbhelper.execute('getReviewByIdWithUser', { review_id });
        return res.status(200).json({
            review: review.recordset,
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.getReviewById = getReviewById;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id, rating, comment, user_id } = req.body;
        // Validate input data here if needed
        const result = yield dbhelper.execute('updateReview', {
            review_id,
            rating,
            comment,
            user_id,
        });
        console.log(result);
        return res.status(200).json({
            message: 'Review updated successfully',
        });
    }
    catch (error) {
        return res.json({
            error: error,
        });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { review_id } = req.params;
        // Check if the review exists before attempting deletion
        const reviewExists = yield dbhelper.execute('getReviewByIdWithUser', { review_id });
        if (!reviewExists.recordset.length) {
            return res.status(404).json({ error: 'Review not found' });
        }
        // Delete the review
        yield dbhelper.execute('deleteReview', { review_id });
        return res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
exports.deleteReview = deleteReview;
