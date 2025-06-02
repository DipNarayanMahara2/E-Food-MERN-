const Products = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productQty,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productQty
  ) {
    return res.status(400).json({
      message: "Please provide all the information.",
    });
  }

  // Inset into table
  const newProducts = await Products.create({
    productName,
    productDescription,
    productPrice,
    productQty,
    productStatus,
  });
  res.status(200).json({
    message: "Product created Successfully.",
    products: newProducts,
  });
};
