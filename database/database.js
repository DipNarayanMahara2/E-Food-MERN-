const mongoose = require("mongoose");
const Users = require("../model/userSchema");

exports.connectDatabase = async () => {
  // Connecting database

  try {
    const mongoDB_key = process.env.MONGO_URL;
    await mongoose.connect(mongoDB_key);
    console.log("Database is Connected Successfully.....");
  } catch (error) {
    console.log(error);
  }

  //   Admin Seeder

  const isAdminExists = await Users.findOne({ userEmail: "admin@gmail.com " });
  console.log(isAdminExists);

  if (!isAdminExists) {
    await Users.create({
      userEmail: "admin@gmail.com",
      userPassword: "admin",
      userPhoneNumber: 9814392678,
      userName: "admin",
      role: "admin",
    });

    console.log("admin seeded successfully..");
  } else {
    console.log("Admin already seeded...");
  }
};
