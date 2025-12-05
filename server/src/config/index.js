import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
    EMAILJS_SERVICEID: process.env.EMAILJS_SERVICEID || "",
    EMAILJS_TEMPLATEID: process.env.EMAILJS_TEMPLATEID || "",
    EMAILJS_PUBLICKEY: process.env.EMAILJS_PUBLICKEY || "",
    EMAILJS_PRIVATEKEY: process.env.EMAILJS_PRIVATEKEY || ""
}


export default config;