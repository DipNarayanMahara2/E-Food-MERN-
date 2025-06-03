const Products = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  const file = req.file;
  let filePath;
  if (!file) {
    filePath =
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D";
  } else {
    filePath = req.file.filename;
  }

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
    productImage: process.env.SERVER_LINK + filePath,
  });
  res.status(200).json({
    message: "Product created Successfully.",
    products: newProducts,
  });
};
