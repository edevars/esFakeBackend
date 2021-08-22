const cloudinary = require("cloudinary").v2;
const { config } = require("../../config");

const { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryCloudName } = config;

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

module.exports = { cloudinary };
