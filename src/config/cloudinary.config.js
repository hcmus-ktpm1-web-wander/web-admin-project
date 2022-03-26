require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.v2.config(process.env.CLOUDINARY_URL);

module.exports = cloudinary;