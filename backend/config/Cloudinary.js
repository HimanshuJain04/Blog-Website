const cloudinary = require('cloudinary');
require('dotenv').config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });

        console.log("Cloudinary Connection Successfull");

    } catch (err) {

        console.log("cloudinary connection error");
        console.log(err);

    }
}

module.exports = cloudinaryConnect; 