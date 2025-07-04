const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: [true, "userName is required"],
  },
  userEmail: {
    type: String,
    require: [true, "user email is required"],
  },
  userPhoneNumber: {
    type: Number,
    require: [true, "user phone number is required"],
  },
  userPassword: {
    type: String,
    require: [true, "userPassword is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
    
  },
  otp: {
    type: Number,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
