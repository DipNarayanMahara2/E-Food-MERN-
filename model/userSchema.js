const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userEmail: {
    type: String,
    require: [true, "Email is requied"],
  },
  userName: {
    type: String,
    require: [true, "Username is requied"],
  },
  userPhoneNumber: {
    type: Number,
    require: [true, "Phone Number is requied"],
  },
  userPassword: {
    type: String,
    require: [true, "Password is requied"],
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  otp: {
    type: Number,
  },
  isOtpVerified: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
