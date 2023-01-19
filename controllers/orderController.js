const Order = require("../models/orderModel");
const Product = require("../models/productModel");


// Create new Order
exports.newOrder = async (req, res, next) => {
  const {
    email,
    total,
    shipping,
    totalQuantity,
    tax,
    grandTotal,
    cart,
    address,
    phoneNo
  } = req.body;

  const order = await Order.create({
    email,
    total,
    shipping,
    totalQuantity,
    tax,
    grandTotal,
    cart,
    address,
    phoneNo
  });

  console.log(order)

  res.status(201).json({
    success: true,
    order,
  });
};

// get Single Order
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get logged in user  Orders
exports.myOrders = async (req, res, next) => {

  const email = req.headers.email

  const orders = await Order.find({ email });



  res.status(200).json({
    success: true,
    orders
  });
}

// get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
}


