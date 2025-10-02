import mongoose from "mongoose";
import data from "./data.js";
import Listing from "../models/listing.js";

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDatabase = async() => {
    await Listing.deleteMany({});
    const ownerId = "68d5189dd1410830adefaeab";

    // Har listing me owner add kar diya
    const listingsWithOwner = data.map(listing => ({
        ...listing,
        Owner: ownerId
    }));

    await Listing.insertMany(listingsWithOwner);
}



initDatabase().then(() => {
    console.log('Database initialization complete');
    mongoose.connection.close();
}).catch(err => {
    console.error('Error initializing database:', err);
    mongoose.connection.close();
});