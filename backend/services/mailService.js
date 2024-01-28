import nodemailer from "nodemailer";
import { config } from "dotenv";
import { forgetTemplate } from "../templates/email.template.js";
config();
// console.log("EmailInFunction", process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  service: "outlook",
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  port: 587,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendForgotPasswordMail = async (user) => {
  // console.log("EmailInFunction", user.email);
  // return;
  const mailSent = await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to: user.email,
    subject: "Forgot Password ✔",
    text: "Email for forgot password?",
    html: forgetTemplate(user),
  });
  console.log("mailSent", mailSent);
};

export { transporter, sendForgotPasswordMail };
