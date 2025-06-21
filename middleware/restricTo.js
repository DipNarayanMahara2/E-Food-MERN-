const restricTo = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "You don't have permission to perform this task.",
      });
    }
    next();
  };
};

module.exports = restricTo;
