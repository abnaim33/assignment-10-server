const Order = require("../models/orderModel");
const Product = require("../models/productModel");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

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

// update Order Status -- Admin
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // if (!order) {
  // return next(new ErrorHander("Order not found with this Id", 404));
  if (!order) {
    res.status(404).json({
      success: true,
      message: "Order if not found with this id"
    });
  }

  // }

  if (order.orderStatus === "Delivered") {
    // return next(new ErrorHander("You have already delivered this order", 400));

    res.status(400).json({
      success: true,
      message: "You have already devlivered this order"
    });



  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
}

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  // if (!order) {
  //   return next(new ErrorHander("Order not found with this Id", 404));
  // }

  if (!order) {
    res.status(404).json({
      success: true,
      message: "Order is not found with this id"
    });
  }


  await order.remove();

  res.status(200).json({
    success: true,
  });
}
