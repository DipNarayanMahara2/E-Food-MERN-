const Products = require("../../../model/productModel");

exports.createProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong...`,
    });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Products.find();
  try {
    if (products.length == 0) {
      res.status(400).json({
        message: "No product found",
        product: [],
      });
    } else {
      res.status(200).json({
        message: "Products fetched successfully.",
        products,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..",
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Provide Product id",
    });
  }

  const product = await Products.findById({ _id: id });
  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      product: [],
    });
  }
  res.status(200).json({
    message: "product fetched successfully.",
    product,
  });
};
