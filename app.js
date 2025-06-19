const express = require("express");
const { connectDatabase } = require("./database/database");
const app = express();
require("dotenv").config();
const authRoute = require("./routes/authRoute");

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
app.use("/api/auth", authRoute);

// Listening server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is live..");
});
