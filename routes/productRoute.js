const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
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
  )
  .get(getProducts);

router
  .route("/product/:id")
  .get(getProduct)
  .delete(isAuthenticated, restricTo("admin"), deleteProduct)
  .patch(
    isAuthenticated,
    uploads.single("productImage"),
    restricTo("admin"),
    updateProduct
  );

// router.route("/updateProduct/:id").patch(updateProduct);
module.exports = router;
