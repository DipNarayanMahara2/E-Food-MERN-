const mongoose = require("mongoose");
exports.connectDatabase = async () => {
  try {
    const DB_KEY = process.env.DB_CONNECTION;
    await mongoose.connect(DB_KEY);
    console.log("Database connected succesfully..");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
