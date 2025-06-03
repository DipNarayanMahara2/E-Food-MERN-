const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");
const { multer, storage } = require("../middleware/multerConfig");
const catchAsync = require("../services/catchAsync");
const upload = multer({ storage: storage });

const productRouter = require("express").Router();

// rotues here

productRouter
  .route("/products")
  .post(
    isAuthenticated,
    restricTo("admin"),
    upload.single("productImage"),
    createProduct
  )
  .get(getProducts);

productRouter.route("/products/:id").get(catchAsync(getProduct));

module.exports = productRouter;
