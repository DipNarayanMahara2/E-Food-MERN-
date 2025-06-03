// Importing multer for handling file uploads
const multer = require("multer");

// Configure storage settings for multer
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files
  destination: function (req, file, cb) {
    // checking the mimetype of file
    const allowedFileType = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/svg",
    ];
    if (!allowedFileType.includes(file.mimetype)) {
      return cb(new Error("This file type is not supported"));
    }

    cb(null, "./uploads"); // Files will be saved in the 'upload' folder
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use the original file name (this may be undefined, see note below)
  },
});

// Export multer and storage configuration for use in other files
module.exports = {
  multer,
  storage,
};
