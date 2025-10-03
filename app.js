import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
    console.log(process.env.name);
}
console.log("Cloud name:", process.env.KEY_NAME);
console.log("API Key:", process.env.API_KEY);
console.log("API Secret:", process.env.API_SECRET);


import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import expressError from './utils/expressErrors.js';
import { listingSchema, reviewSchema } from './schema.js';
import listingRoutes from './routes/listing.js';
import reviewroute from './routes/reviews.js'
import userRoutes from './routes/user.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import LocalStrategy from 'passport-local';
import user from './models/user.js';
import passport from 'passport';




// import { listingSchema } from './schema.js';
// import { reviewSchema } from './schema.js'


const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

app.use(session({
    secret: 'enma',
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        touchAfter: 24 * 3600 // time period in seconds
    }),
    resave: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); // storing user in session
passport.deserializeUser(user.deserializeUser()); // removing user from session

main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.listen(8080, () => {
    console.log('Server is running on ' + `http://localhost:8080`);
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.use('/listings', listingRoutes);

//  Home route
app.get('/', (req, res) => {
    res.redirect("/listings");
});


app.use('/listings/:id/reviews', reviewroute);
app.use('/', userRoutes);

// 404 Handler 
app.all('/error', (req, res, next) => {
    next(new expressError(404, "Page not found"));
});

//  Global Error Handling Middleware (always last)
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    console.log(err);
    res.render('./listings/error.ejs', { err });
});