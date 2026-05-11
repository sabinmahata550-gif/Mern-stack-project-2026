import { v2 as cloudinary } from 'cloudinary';
import config from './config.js';
function connectCloudinary() {
    // Configuration
    cloudinary.config({
        cloud_name:config.cloudinary.cloudName,
        api_key:config.cloudinary.apiKey,
        api_secret:config.cloudinary.apiSecret,// Click 'View API Keys' above to copy your API secret
    });
}

export default connectCloudinary;