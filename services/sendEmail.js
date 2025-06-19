const nodemailer = require("nodemailer");
// const { options } = require("../routes/authRoute")

const sendEmail = async (options) => {
  var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOption = {
    from: '"QuickFood" <quickfood@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  await transpoter.sendMail(mailOption);
};

module.exports = sendEmail;
