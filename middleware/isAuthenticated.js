const jwt = require("jsonwebtoken");
const Users = require("../model/userSchema");
const promisify = require("util").promisify;

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "Please sent token.",
    });
  }
  // token lai verfy garne
  // jwt.verify(token, process.env.JWT_KEY, (err, success) => {
  //   if (err) {
  //     res.status(400).json({
  //       message: "Invalid token",
  //     });
  //   } else {
  //     res.status(200).json({
  //       message: "Valid Token",
  //     });
  //   }
  // });

  // Alternative

  try {
    const isTokenDecoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const userExist = await Users.findById({ _id: isTokenDecoded.id });

    // checking if the user exist or not
    if (!userExist) {
      return res.status(404).json({
        message: "The user deos not exist.",
      });
    }

    req.user = userExist;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Don't try to do this",
    });
  }
};

module.exports = isAuthenticated;
