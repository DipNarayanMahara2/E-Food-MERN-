const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/userSchema");
const sendEmail = require("../services/sendEmail");

// user Register logic

exports.registerUser = async (req, res) => {
  const { email, password, phoneNumber, userName } = req.body;

  if (!email || !password || !phoneNumber || !userName) {
    return res.status(400).json({
      message: "Please provide email, password, phone Number and Username",
    });
  }

  // checking if the user is already register or not
  const userFound = await Users.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User is already registered with this email",
    });
  }

  const newUser = await Users.create({
    userName: userName,
    userPhoneNumber: phoneNumber,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User registered successfully...",
    user: newUser,
  });
};

// user Login logics

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  // checking if email or password is enterd or not
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email or password",
    });
  }
  // checking if the email exist or not
  const userFound = await Users.find({ userEmail: email });

  if (userFound.length === 0) {
    return res.status(404).json({
      message: "This email is not registered.",
    });
  }

  // checking if email or password is wrong

  const passwordIsMatched = bcrypt.compareSync(
    password,
    userFound[0].userPassword
  );
  if (passwordIsMatched) {
    // generate tokens
    const key = process.env.JWT_KEY;
    const token = jwt.sign({ id: userFound[0]._id }, key, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "User login Successfully.",
      token,
    });
  } else {
    res.status(401).json({
      message: "Invalid email or password",
    });
  }
};

// Forget Passoword

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please Provide an Email.",
    });
  }
  // Checking if the email is registered or not

  const userFound = await Users.find({ userEmail: email });
  if (userFound.length === 0) {
    return res.status(404).json({
      message: "Email is not registered.",
    });
  }

  //   generating OTP

  const otp = Math.floor(1000 + Math.random() * 9000);
  // save otp in db
  userFound[0].otp = otp;
  await userFound[0].save();

  await sendEmail({
    email: email,
    subject: "Reset your password.",
    message: `Your OTP is ${otp}. Don't share OTP with others`,
  });

  res.status(200).json({
    message: "Email Sent Successfully.",
  });
};

// Verify OPT

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please Provide Email. OTP",
    });
  }
  // checking the email is registered or not
  userExsits = await Users.find({ userEmail: email });
  if (userExsits.length == 0) {
    return res.status(404).json({
      message: "This email is not registered",
    });
  }

  // checking opt is correct or not
  if (userExsits[0].otp !== otp) {
    res.status(400).json({
      message: "Invalid OTP",
    });
  } else {
    // desposing the opt after using it one time
    userExsits[0].otp = undefined;
    userExsits[0].isOtpVerified = true;
    await userExsits[0].save();
    res.status(200).json({
      message: "Opt is correct",
    });
  }
};

// reset Password

exports.resetPassowrd = async (req, res) => {
  const { email, newPassword, conformPassword, isOtpVerified } = req.body;
  if (!email || !newPassword || !conformPassword) {
    return res.status(400).json({
      message: "Please Provide an email and passowds",
    });
  }
  // checkign newpassword and comform password
  if (newPassword !== conformPassword) {
    return res.status(404).json({
      message:
        "Please enter same password in both newPassword and comform Password",
    });
  }

  // finding email and saving the new passowrd
  const userExists = await Users.find({ userEmail: email });
  if (userExists.length == 0) {
    return res.status(400).json({
      message: "This emial is not registered",
    });
  }

  if (isOtpVerified !== true) {
    return res.status(403).json({
      message:
        "you have already reset your password. Please request for new OTP and try to reset the password",
    });
  }

  userExists[0].userPassword = bcrypt.hashSync(newPassword, 10);
  userExsits[0].isOtpVerified = false;
  await userExists[0].save();

  res.status(200).json({
    message: "Your Password reset successfully",
  });
};
