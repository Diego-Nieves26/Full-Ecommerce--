const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

// Models
const { ProductsInCart } = require("../models/productsInCart.model");
const { Product } = require("../models/product.model");
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Email } = require("../utils/email.util");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  await new Email().sendWelcome({ username, email, order: "" });

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new AppError("Credentials invalid", 404));
  }

  const isPasswordaValid = await bcrypt.compare(password, user.password);

  if (!isPasswordaValid) {
    return next(new AppError("Credentials invalid", 404));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  res.status(201).json({
    status: "success",
    token,
  });
});

const getAllTheUserProducts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const products = await Product.findAll({
    where: { userId: sessionUser.id, status: "active" },
  });

  res.status(200).json({
    status: "success",
    products,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { username, email } = req.body;

  await user.update({ username, email });

  res.status(204).json({ status: "success" });
});

const disableUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [
      {
        model: Cart,
        include: { model: ProductsInCart, where: { status: "purchased" } },
      },
    ],
  });

  res.status(200).json({
    status: "success",
    orders,
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, userId: sessionUser.id },
    include: [
      {
        model: Cart,
        include: { model: ProductsInCart, where: { status: "purchased" } },
      },
    ],
  });

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

module.exports = {
  createUser,
  login,
  getAllTheUserProducts,
  updateUser,
  disableUser,
  getAllOrders,
  getOrderById,
};
