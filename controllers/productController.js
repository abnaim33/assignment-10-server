const Product = require("../models/productModel");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {


  console.log(req.body)


  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });

  

};

// Get All Product
exports.getAllProducts = async (req, res, next) => {



  const products = await Product.find({})
  res.status(200).json({
    success: true,
    products

  });
};

// Get All Product (Admin)
exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};



// Update Product -- Admin


// Delete Product

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.headers.id);

  if (!product) {
    res.status(404).json({
      success: true,
      message: "product not found"
    });
  }

 

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};






