import Listing from '../models/listing.js';
import Review from '../models/review.js';

const postReview = async(req, res) => {
    let list = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listings/${list._id}`);
}

const deleteReview = async(req, res, next) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}

export default { postReview, deleteReview };