import express from 'express';
import { authenticate } from '../auth/VerifyToken.js';
import { createReview, getReviewsForServiceProvider } from '../Controller/reviewController.js';

const reviewRouter = express.Router();

// Create Review (User or ServiceProvider giving review to ServiceProvider)
reviewRouter.post('/add',authenticate, createReview);

// Get Reviews for a Service Provider
reviewRouter.get('/:serviceProviderId', getReviewsForServiceProvider);

export default reviewRouter;
