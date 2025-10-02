import Listing from '../models/listing.js';
import wrapAsync from '../utils/asyncWrap.js';
import express from 'express';
import Review from '../models/review.js';
const route = express.Router({ mergeParams: true });
import { isLoggedIn, saveredirecturl, reviewAuthor } from '../views/user/middleware.js';
import reviewController from '../controller/review.js';
// import { listingSchema } from './schema.js';
import { reviewSchema } from '../schema.js'

const validateReview = (req, res, next) => {
        let { error } = reviewSchema.validate(req.body.review);
        if (error) {
            throw new expressError(404, error);
        }
        next();
    }
    // add review =>> post review route
route.post('/', validateReview, isLoggedIn, wrapAsync(reviewController.postReview));
// delete review ==>
route.delete('/:reviewId', validateReview, isLoggedIn, reviewAuthor, wrapAsync(reviewController.deleteReview));
export default route;