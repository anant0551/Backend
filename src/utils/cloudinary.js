import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; 


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async (filePath) => {
    try{
        if (!filePath) return null;
        const response = awaitcloudinary.uploader.upload(filePath, {
            resourse_type: "auto",
        })
        console.log("File uploaded on cloudinary", resourse.url);
        return response;
    }catch (error) {
        fs.unlinkSync(filePath); // remove the locally save temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary};