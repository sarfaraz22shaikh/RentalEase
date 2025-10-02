import Listing from '../models/listing.js';
import { listingSchema } from '../schema.js';

const index = async(req, res) => {
    let allListings = await Listing.find({}).populate('Owner');
    res.render('./listings/index.ejs', { allListings });
}

const newListingForm = (req, res) => {
    res.render('./listings/new.ejs');
}

const postListing = async(req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const { title, description, price, location, country } = req.body;
    let result = listingSchema.validate(req.body);
    const newListing = new Listing({ title, description, price, location, country });
    newListing.Owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", " New Listing Added Successfully!");
    console.log('New Listing Created:', newListing);
    res.redirect('/listings');
}

const updateListing = async(req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(id, { title, description, price, location, country });

    if (typeof req.file !== 'undefined') {
        const url = req.file.path;
        const filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
        console.log('Image updated:', updatedListing.image.url);
    }
    console.log('Listing updated:', updatedListing);
    res.redirect(`/listings/${id}`);
}

const deleteListing = async(req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("error", "❌ Listing Deleted Successfully!");
    console.log('Listing deleted:', deletedListing);
    res.redirect('/listings');
}

const showListing = async(req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", }, }).populate("Owner");
    console.log(listing);
    res.render('./listings/show.ejs', { listing });
}

const editListingForm = async(req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('./listings/edit.ejs', { listing });
}

export default { index, newListingForm, postListing, updateListing, deleteListing, showListing, editListingForm };