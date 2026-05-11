import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },

    brand: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      lowercase: true,
    },


    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required:[ true,"Created by user id is required"],

    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    imageUrls:{
      type:["String"],

    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;