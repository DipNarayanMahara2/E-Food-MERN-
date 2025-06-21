const {
  registerUser,
  userLogin,
  forgetPassword,
  verifyOtp,
  updatePassword,
} = require("../controller/auth/authController");

const router = require("express").Router();

// routes here
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/forgetPassword").post(forgetPassword);
router.route("/verifyOtp").post(verifyOtp);
router.route("/resetPassword").post(updatePassword);

module.exports = router;
