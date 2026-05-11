import dotenv from 'dotenv';
dotenv.config();

const config = {
    appUrl: process.env.APP_URL,
    MONGO_URI: process.env.MONGO_URI || "",
    port: process.env.Port || "",
    JWT_SECRET: process.env.JWT_SECRET,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || ""
    },
    khalti: {
        apiUrl: process.env.KHALTI_API_URL || "",
        secretKey: process.env.KHALTI_SECRET_KEY || "",
        returnUrl: process.env.KHALTI_RETURN_URL || ""
    },
    resendEmailApiKey: process.env.RESEND_EMAIL_API_KEY || ""
}

export default config;