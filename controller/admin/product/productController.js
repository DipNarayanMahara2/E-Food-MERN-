const path = require("path");
const Products = require("../../../model/productModel");
const fs = require("fs");

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
      // Delete uploaded file if validation fails
      if (file && file.filename) {
        fs.unlink("./uploads/" + file.filename, (err) => {
          if (err) console.log("Error deleting file:", err);
        });
      }
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
    // Delete uploaded file if any error occurs
    if (req.file && req.file.filename) {
      fs.unlink("./uploads/" + req.file.filename, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }
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

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide product id",
    });
  }
  // checking prodcut exsits or not
  const productExist = await Products.findById(id);
  if (!productExist) {
    return res.status(404).json({
      message: "There no product with this id",
    });
  }

  // Delete uploaded file after delete operation is successful

  // Get image path and delete file

  const oldProductImage = productExist.productImage;
  const lengthToCut = process.env.SERVER_LINK.length;
  let finalFilePath = oldProductImage.slice(lengthToCut);
  // Join with correct absolute path
  const fullFilePath = path.join("./uploads", finalFilePath);

  fs.unlink(fullFilePath, (err) => {
    if (err) {
      console.log("Error deleting image file:", err.message);
    } else {
      console.log("Deleted");
    }
  });

  // Delete product from database
  await Products.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product deleted successfully",
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

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
    !productQty ||
    !id
  ) {
    return res.status(400).json({
      message: "Please provide product id and all information.",
    });
  }

  const oldData = await Products.findById(id);
  if (!oldData) {
    return res.status(404).json({
      message: "No data found with this id",
    });
  }

  const oldProductImage = oldData.productImage;
  const lengthToCut = process.env.SERVER_LINK.length;
  const finalFilePath = oldProductImage.slice(lengthToCut);

  if (req.file && req.file.filename) {
    // remove file form upload folder
    fs.unlink("./uploads/" + finalFilePath, (err) => {
      if (err) {
        console.log("Error deleting File", err);
      } else {
        console.log("file deleted successfully");
      }
    });
  }
  const data = await Products.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStatus,
      productQty,
      productImage:
        req.file && req.file.filename
          ? process.env.SERVER_LINK + req.file.filename
          : oldProductImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    message: "Product Updated Successfully.",
    newData: data,
  });
};
