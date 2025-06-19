const {
  registerUser,
  userLogin,
  forgetPassword,
} = require("../controller/auth/authController");

const router = require("express").Router();

// routes here
router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/forgetPassword").post(forgetPassword);

module.exports = router;
