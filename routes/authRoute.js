const {
  registerUser,
  userLogin,
  forgetPassword,
  verifyOtp,
  resetPassowrd,
} = require("../controller/authController");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router();

// routes here
router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(userLogin));
router.route("/forgetPassword").post(catchAsync(forgetPassword));
router.route("/verifyOtp").post(catchAsync(verifyOtp));
router.route("/resetPassword").post(catchAsync(resetPassowrd));

module.exports = router;
