import nodemailer from "nodemailer";
import config from "./index.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.SMTP_MAIL_USERNAME,
        pass: config.SMTP_MAIL_PASSWORD,
    },
})


export default transporter;