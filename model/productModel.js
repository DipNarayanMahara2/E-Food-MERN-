const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      require: [true, "Product name must be provided"],
    },
    productPrice: {
      type: Number,
      require: [true, "Price should be given"],
    },
    productDescription: {
      type: String,
      require: [true, "Product description must be provided"],
    },
    productStockQty: {
      type: Number,
      require: [true, "Product Quantity shoould be given"],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    productImage: {
      type: String,
      require: [true, "Product image is necessary"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
