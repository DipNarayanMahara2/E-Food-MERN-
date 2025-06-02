


const restricTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log(userRole);
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "Access Denied. Admin only",
      });
    } else {
      next();
    }
  };
};

module.exports = restricTo;
