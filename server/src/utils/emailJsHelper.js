import emailjs from '@emailjs/nodejs';
import config from "../config/index.js";

const emailJsHelper = async (option) => {
    await emailjs.send(
        config.EMAILJS_SERVICEID,
        config.EMAILJS_TEMPLATEID,
        {
            to_email: option.email,
            link: option.link,
            app_name: "Mern-Todo-Auth"
        },
        {
            publicKey: config.EMAILJS_PUBLICKEY,
            privateKey: config.EMAILJS_PRIVATEKEY
        }
    )
}

export default emailJsHelper;