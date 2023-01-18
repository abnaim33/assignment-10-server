const Product = require("../models/productModel");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {


  console.log(req.body)


  // req.body.images = imagesLinks;
  // req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });

  // console.log(req.body)

};

// Get All Product
exports.getAllProducts = async (req, res, next) => {
  // const resultPerPage = 8;
  // const productsCount = await Product.countDocuments();

  // const apiFeature = new ApiFeatures(Product.find(), req.query)
  //   .search()
  //   .filter();

  // let products = await apiFeature.query;

  // let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;
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

// Get Product Details
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: true,
      message: "product not found"
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: true,
      message: "product not found"
    });
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.headers.id);

  if (!product) {
    res.status(404).json({
      success: true,
      message: "product not found"
    });
  }

  // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};






