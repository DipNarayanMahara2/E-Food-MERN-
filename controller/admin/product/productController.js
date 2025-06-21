const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;

  const file = req.file;

  let filePath;
  if (!file) {
    filePath =
      "https://i0.wp.com/bakaasur.com/wp-content/uploads/2022/12/fried-momo-recipe.jpg?fit=1200%2C675&ssl=1";
  } else {
    filePath = req.file.filename;
  }

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty
  ) {
    return res.status(400).json({
      message: "Please provide all the details.",
    });
  }

  // inserting into database
  await Product.create({
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
    productImage: "http://localhost:3000/" + filePath,
  });

  res.status(200).json({
    message: "Product Created Successfully.",
  });
};
