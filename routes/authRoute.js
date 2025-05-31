const {
  registerUser,
  userLogin,
  forgetPassword,
  verifyOtp,
} = require("../controller/authController");

const router = require("express").Router();

// routes here
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/forgetPassword").post(forgetPassword);
router.route("/verifyOtp").post(verifyOtp);

module.exports = router;
