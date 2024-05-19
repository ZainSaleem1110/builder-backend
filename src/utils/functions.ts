// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");

export const sendEmail = async ({ receiver, code = null }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAIL_EMAIL,
      pass: process.env.NODE_MAIL_PASSWORD,
    },
  });
  const fromName = `Estimator AI ${process.env.NODE_MAIL_EMAIL}`;
  const msg = {
    to: receiver,
    from: fromName,
    subject: "Verification Code",
    text: "Please use this code for verification. If It is not working then resend email.",
    html: `<strong>your verification code is ${code}  </strong>`,
  };
  try {
    const response = await transporter.sendMail(msg);
    // console.log('send mail to ' + response);
    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendOrderSuccessful = async ({ receiver }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAIL_EMAIL,
      pass: process.env.NODE_MAIL_PASSWORD,
    },
  });
  const fromName = `Estimator AI ${process.env.NODE_MAIL_EMAIL}`;
  const msg = {
    to: receiver,
    from: fromName,
    subject: "Congratulations",
    text: "Congratulations! your order has been successfully placed.",
    html: `Congratulations! your order has been successfully placed.`,
  };
  try {
    const response = await transporter.sendMail(msg);
    // console.log('send mail to ' + response);
    console.log("res", response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const generateRandom5DigitNumber = () => {
  return Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
};
