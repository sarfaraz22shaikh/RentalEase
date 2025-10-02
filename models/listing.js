import mongoose, { Schema } from 'mongoose';
import Review from './review.js';
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
        required: true,
        default: 'India'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
const Listing = mongoose.model('Listing', listingSchema);
export default Listing;