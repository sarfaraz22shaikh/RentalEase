import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Model ka naam singular aur capital hona best practice hai (Review)
const Review = mongoose.model("Review", reviewSchema);

export default Review;