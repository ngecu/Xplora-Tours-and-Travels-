import { Request, Response } from 'express';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import Connection from '../dbhelpers/dbhelpers';
import { registerUserSchema } from '../validators/validators';
import { ExtendedUser } from '../middlewares/verifyToken';

const dbhelper = new Connection;

export const createReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment, user_id } = req.body;
    
    const review_id = v4();

    const result = await dbhelper.execute('createReview', {
      review_id,
      rating,
      comment,
      user_id,
    });

    console.log(result);

    return res.status(200).json({
      message: 'Review created successfully',
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const getAllReviews = async (req: ExtendedUser, res: Response) => {
  try {
    const reviews = await dbhelper.execute('getAllReviewsWithUsers');

    return res.status(200).json({
      reviews: reviews.recordset,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { review_id } = req.params;

    const review = await dbhelper.execute('getReviewByIdWithUser', { review_id });

    return res.status(200).json({
      review: review.recordset,
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { review_id, rating, comment, user_id } = req.body;

    // Validate input data here if needed

    const result = await dbhelper.execute('updateReview', {
      review_id,
      rating,
      comment,
      user_id,
    });

    console.log(result);

    return res.status(200).json({
      message: 'Review updated successfully',
    });

  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

export const deleteReview = async (req: ExtendedUser, res: Response) => {
  try {
    const { review_id } = req.params;

    // Check if the review exists before attempting deletion
    const reviewExists = await dbhelper.execute('getReviewByIdWithUser', { review_id });

    if (!reviewExists.recordset.length) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Delete the review
    await dbhelper.execute('deleteReview', { review_id });

    return res.status(200).json({ message: 'Review deleted successfully' });

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal Server Error',
    });
  }
};
