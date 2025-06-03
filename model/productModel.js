const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true || "Product name must be provided"],
    },
    productDescription: {
      type: String,
      required: [true || "Product description must be provided"],
    },
    productPrice: {
      type: Number,
      required: [true || "Product Price must be provided"],
    },
    productQty: {
      type: Number,
      required: [true || "Product Quntity must be provided"],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
    },
    productImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
