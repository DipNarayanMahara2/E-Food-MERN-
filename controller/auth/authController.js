const User = require("../../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");
User;
// register user
exports.registerUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  if (!username || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide all the details",
    });
  }
  // check if user email already exist or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message:
        "This email is already resgisterd please use new email or try to login",
    });
  }

  await User.create({
    userName: username,
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: bcrypt.hashSync(password, 10),
  });
  res.status(201).json({
    message: "User successfully registered",
  });
};

// User Login
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please Provide email and password",
    });
  }
  // check if user exists or not
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }
  // check password
  const isPasswordMatch = bcrypt.compareSync(
    password,
    userExist[0].userPassword
  );
  if (isPasswordMatch) {
    // generate token
    const token = jwt.sign({ id: userExist[0]._id }, process.env.SECRETE_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "User login successfully",
      token,
    });
  }
  res.status(400).json({
    message: "Invalid password or email",
  });
};

// Forget Passowrd

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide an email",
    });
  }
  // check if email is registered or not
  const emailExist = await User.find({ userEmail: email });
  if (emailExist.length == 0) {
    return res.status(400).json({
      message: "This email is not registered",
    });
  }

  // generate otp and send email
  const otp = Math.floor(10000 + Math.random() * 90000);
  emailExist[0].otp = otp;
  await emailExist[0].save();

  await sendEmail({
    email: email,
    subject: `Password Reset OTP `,
    text: `This is you otp to reset password. ${otp}. Don't share this to anyone`,
  });
  res.status(200).json({
    message: "Email send Successfully",
  });
};

// Verigfy OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide an email or otp",
    });
  }

  // check if opt is correct
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }
  if (userFound[0].otp !== otp) {
    return res.status(400).json({
      message: "Invalid Otp",
    });
  }

  // disposing the opt after use
  userFound[0].otp = undefined;
  await userFound[0].save();
  res.status(200).json({
    message: "Otp verified",
  });
};

// update password
exports.updatePassword = async (req, res) => {
  const { email, newPassword, conformPassword } = req.body;
  if (!email || !newPassword || !conformPassword) {
    return res.status(400).json({
      message: "Please provide all the details",
    });
  }

  if (newPassword !== conformPassword) {
    return res.status(400).json({
      message: "Password doesn't match. Please insert same passwords",
    });
  }

  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }

  // checking if new password is same old password or not
  // first need to convert the hashed password to normal password for checking
  const isSamePassword = bcrypt.compareSync(
    newPassword,
    userFound[0].userPassword
  );
  if (isSamePassword) {
    return res.status(400).json({
      message: "This password is already been used. Please use another one",
    });
  }

  userFound[0].userPassword = bcrypt.hashSync(newPassword, 10);
  await userFound[0].save();

  res.status(200).json({
    message: "Password reset successfully",
  });
};
