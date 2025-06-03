module.exports = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      return res.status(500).json({
        message: error.message,
        fullError: error,
      });
    });
  };
};
