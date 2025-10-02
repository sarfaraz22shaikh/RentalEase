import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
    console.log(process.env.name);
}

cloudinary.config({
    cloud_name: process.env.KEY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "some-folder-name",
        allowed_formats: ["png", "jpeg", "jpg"],
    },
});

export { cloudinary, storage };