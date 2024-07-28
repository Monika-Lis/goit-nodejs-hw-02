const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationEmail = {
    from: '"Monika" <monika@test.com>',
    to: email,
    subject: "Email Verification",
    html: `<strong>Please verify your email by clicking the following link: <a href="http://localhost:${
      process.env.MAIN_PORT || 3000
    }/api/user/verify/${verificationToken}">Verify Email</a></strong>`,
  };

  try {
    await transporter.sendMail(verificationEmail);
  } catch (error) {
    console.error("Error sending verification email: ", error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
};
