const bcrypt = require("bcryptjs");
const Users = require("./model/userSchema");

const adminSeeder = async () => {
  //   Admin Seeder

  const isAdminExists = await Users.findOne({ userEmail: "admin@gmail.com" });

  if (!isAdminExists) {
    await Users.create({
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userPhoneNumber: 9814392678,
      userName: "admin",
      role: "admin",
    });

    console.log("admin seeded successfully..");
  } else {
    console.log("Admin already seeded...");
  }
};

module.exports = adminSeeder;
