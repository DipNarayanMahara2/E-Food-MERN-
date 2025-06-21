const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");

const router = require("express").Router();

router.route("/products").post(isAuthenticated,restricTo("admin"),createProduct);

module.exports = router;
