
// requiring express
const express = require("express");
const { connect, model } = require("mongoose");
const { connectDatabase } = require("./database/database");
const Users = require("./model/userSchema");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { registerUser, userLogin } = require("./controller/authController");


// requiring dotenv
require("dotenv").config();

// connecting Database
connectDatabase();

// Server API's

app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am Alive"
    })
})

// register api's

app.post("/register", registerUser)


// Login api
app.post("/login", userLogin)

// Server Listening
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server has Started at port ${port} ......`);
})