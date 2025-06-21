const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");
const { storage, multer } = require("../middleware/multer");
const uploads = multer({ storage: storage });

const router = require("express").Router();

router
  .route("/products")
  .post(
    isAuthenticated,
    uploads.single("productImage"),
    restricTo("admin"),
    createProduct
  );

module.exports = router;
