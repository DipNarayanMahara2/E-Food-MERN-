const express = require("express");
const { connectDatabase } = require("./database/database");
const User = require("./database/model/userSchema");
const app = express();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
connectDatabase();

// testing api for checking if server in live or note

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am alive",
  });
});

// register api
app.post("/register", async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  if (!username || !email || !password || !phoneNumber) {
    return res.status(400).json({
      message: "Please provide all the details",
    });
  }
  // check if user email already exist or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message:
        "This email is already resgisterd please use new email or try to login",
    });
  }

  await User.create({
    userName: username,
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: bcrypt.hashSync(password, 10),
  });
  res.status(201).json({
    message: "User successfully registered",
  });
});

// Login api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please Provide email and password",
    });
  }
  // check if user exists or not
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "user not found with this email",
    });
  }
  // check password
  const isPasswordMatch = bcrypt.compareSync(
    password,
    userExist[0].userPassword
  );
  if (isPasswordMatch) {
    // generate token
    const token = jwt.sign({ id: userExist[0]._id }, process.env.SECRETE_KEY, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "User login successfully",
      token,
    });
  }
  res.status(400).json({
    message: "Invalid password or email",
  });
});

// Listening server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is live..");
});
