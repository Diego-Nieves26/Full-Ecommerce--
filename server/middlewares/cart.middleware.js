// Models
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const cartExist = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });

  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  req.cart = cart;
  next();
});

const productExists = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findOne({
    where: { id: productId, status: "active" },
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  req.product = product;
  next();
});

module.exports = { cartExist, productExists };
