// requiring express
const express = require("express");
const { connectDatabase } = require("./database/database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes/authRoute");

// requiring dotenv
require("dotenv").config();

// connecting Database
connectDatabase();

// Server API's

app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am Alive",
  });
});

// auth Routes
app.use("", router);

// Server Listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has Started at port ${port} ......`);
});
