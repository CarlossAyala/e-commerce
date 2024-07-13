const { v2 } = require("cloudinary");
const env = require("../config");
const { cloud_name, api_key, api_secret } = env.cloudinary;

v2.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
  analytics: false,
});
const cloudinary = v2;

module.exports = cloudinary;
