const restricTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
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
