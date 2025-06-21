const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userSchema");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "You are not login. Please login first",
    });
  }

  // one way to do this
  // jwt.verify(token, process.env.SECRETE_KEY, (err, success) => {
  //   if (err) {
  //     res.status(400).json({
  //       message: "Invalid token",
  //     });
  //   } else {
  //     res.status(200).json({
  //       message: "valid token",
  //     });
  //   }
  // });

  // another way
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRETE_KEY);
    const userExist = await User.findById(decoded.id);
    if (!userExist) {
      return res.status(404).json({
        message: "User does not exist with this token please login",
      });
    }
    req.user = userExist;
    next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
