const {
  createProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");

const productRouter = require("express").Router();

// rotues here

productRouter
  .route("/product")
  .post(isAuthenticated, restricTo("admin"), createProduct);

module.exports = productRouter;
