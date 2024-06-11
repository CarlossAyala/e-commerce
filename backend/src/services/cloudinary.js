const { v2: cloudinary } = require("cloudinary");
const env = require("../config");
const { cloud_name, api_key, api_secret } = env.cloudinary;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
  analytics: false,
});

module.exports = cloudinary;
