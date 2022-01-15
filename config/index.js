/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

const config = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dev: process.env.NODE_ENV === "development",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  authJwtSecret: process.env.JWT_SECRET,
  modelUrl: process.env.MODEL_URL
};

module.exports = { config };
