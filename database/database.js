const mongoose = require("mongoose");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");

exports.connectDatabase = async () => {
  try {
    const DB_KEY = process.env.DB_CONNECTION;
    await mongoose.connect(DB_KEY);
    console.log("Database connected succesfully..");

    // admin seeding
    // first let check if admin exist or not
    const isAdminExsit = await User.findOne({
      role: "admin",
    });
    if (!isAdminExsit) {
      await User.create({
        userName: "Admin",
        userEmail: "dipnarayanmahara28@gmail.com",
        userPassword: bcrypt.hashSync("admin", 10),
        userPhoneNumber: 9814392678,
        role: "admin",
      });
      console.log("admin seeded successfully");
    } else {
      console.log("admin already seeded");
    }
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
