const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");
const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

const productRouter = require("express").Router();

// rotues here

productRouter
  .route("/product")
  .post(
    isAuthenticated,
    restricTo("admin"),
    upload.single("productImage"),
    createProduct
  );

module.exports = productRouter;
