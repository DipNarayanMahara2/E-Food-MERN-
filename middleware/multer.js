const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // checking the mitype of the image
    const allowedImageFormate = ["image/jpeg", "image/png", "image/svg+xml"];

    if (!allowedImageFormate.includes(file.mimetype)) {
      cb(new Error("This filetype is not supported."));
      return;
    }

    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = { storage, multer };
