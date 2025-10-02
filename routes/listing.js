import express from 'express';
import Listing from '../models/listing.js';
import wrapAsync from '../utils/asyncWrap.js';
import { listingSchema, reviewSchema } from '../schema.js';
import { isLoggedIn, saveredirecturl, reviewAuthor } from '../views/user/middleware.js';
import listingController from '../controller/listing.js';
import expressError from '../utils/expressErrors.js';
import { cloudinary, storage } from '../cloudConfig.js';
import multer from 'multer';
const upload = multer({ storage });

const route = express.Router();

const validateListing = (req, res, next) => {
        let { error } = listingSchema.validate(req.body);
        if (error) {
            throw new expressError(404, error);
        }
        next();
    }
    // Index Route
route.get('/', wrapAsync(listingController.index));
// Create Route
route.get('/new', isLoggedIn, listingController.newListingForm);

// save route
route.post('/', upload.single('image1'), wrapAsync(listingController.postListing));

// route.post('/', isLoggedIn, upload.single('image1'), (req, res) => {
//     res.send(req.file.path);
// });
// Update Route
route.put('/:id', upload.single('image'), wrapAsync(listingController.updateListing));
// Delete Route
route.delete('/:id', wrapAsync(listingController.deleteListing));
// Show Route
route.get('/:id', wrapAsync(listingController.showListing));
// Edit Route
route.get('/:id/edit', wrapAsync(listingController.editListingForm));
export default route;