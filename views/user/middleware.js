import Review from "../../models/review.js";

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirect = "/listings/new";
        console.log(req.session.redirect);
        req.flash("error", "You must be signed in first!");
        return res.redirect('/login');
    }
    next();
}

function saveredirecturl(req, res, next) {
    if (req.session.redirect) {
        res.locals.originalUrl = req.session.redirect;
        console.log("this is saved url", res.locals.originalUrl);
    }
    next();
}

let reviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) { // ⚡ req.user (passport) hota hai, req.locals.currentUser nahi
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

export { isLoggedIn, saveredirecturl, reviewAuthor };