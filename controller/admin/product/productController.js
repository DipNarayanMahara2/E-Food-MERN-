const Product = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;

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
  });

  res.status(200).json({
    message: "Product Created Successfully.",
  });
};
