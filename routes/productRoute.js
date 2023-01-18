const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,

  getAdminProducts,
} = require("../controllers/productController");



const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(getAdminProducts);

router
  .route("/admin/product/new")
  .post(createProduct);

router
  .route("/admin/product")
  .delete(deleteProduct);

router.route("/product/:id").get(getProductDetails);



module.exports = router;
