import { v2 as cloudinary } from "cloudinary";
import env from "../config/environments.js";

const { cloud_name, api_key, api_secret } = env.cloudinary;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
  analytics: false,
});

export { cloudinary };
