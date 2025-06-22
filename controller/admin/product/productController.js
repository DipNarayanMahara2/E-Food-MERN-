const path = require("path");
const Product = require("../../../model/productModel");
const { catchAsync } = require("../../../services/catchAsync");

const fs = require("fs");

exports.createProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length == 0) {
      res.status(400).json({
        message: "No product Found",
        products: [],
      });
    } else {
      res.status(201).json({
        message: "Products fetched successfully",
        products,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get single product
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        message: "Please login",
      });
    }

    const productExist = await Product.findById(id);
    if (!productExist) {
      res.status(400).json({
        message: "No product found this id",
        product: [],
      });
    } else {
      res.status(200).json({
        message: "Product fetched successfully",
        product: productExist,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update Prodcut
exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty ||
    !id
  ) {
    return res.status(400).json({
      message: "Please provide all the details.",
    });
  }
  const oldProduct = await Product.findById(id);
  if (!oldProduct) {
    return res.status(400).json({
      message: "No data found",
    });
  }

  const oldProductImage = oldProduct.productImage;
  const lengthToCut = "http://localhost:3000/".length;
  const finalProductImage = oldProductImage.slice(lengthToCut);

  // folder path to delete and update image
  const imagePath = path.join(__dirname, "../../../uploads", finalProductImage);

  if (req.file && req.file.filename) {
    // remove the image form upload folder
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("error deleting image");
      } else {
        console.log("Image Deleted Successfully");
      }
    });
  }

  await Product.findByIdAndUpdate(id, {
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
    productImage:
      req.file && req.file.filename
        ? "http://localhost:3000/" + req.file.filename
        : oldProductImage,
  });

  res.status(201).json({
    message: "Product Updated Successfully",
  });
});

// delete prodcut

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Please login first to delete the product",
      });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(400).json({
        message: "No product Found with this id",
        product: [],
      });
    }

    const oldProductImage = deleteProduct.productImage;
    const lengthToCut = "http://localhost:3000/".length;
    const finalProductImage = oldProductImage.slice(lengthToCut);

    // Build the absolute path to the image in uploads folder
    const imagePath = path.join(
      __dirname,
      "../../../uploads",
      finalProductImage
    );

    // remove the image from upload folder
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("error deleting image");
      } else {
        console.log("Image Deleted Successfully");
      }
    });
    res.status(201).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
