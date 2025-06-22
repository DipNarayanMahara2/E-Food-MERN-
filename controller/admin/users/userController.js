const User = require("../../../model/userSchema");

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  if (users.length > 0) {
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    }); 
  } else {
    res.status(404).json({
      message: "No user found",
      data: [],
    });
  }
};
