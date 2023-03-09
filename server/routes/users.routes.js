const express = require("express");

// Controllers
const {
  createUser,
  login,
  getAllTheUserProducts,
  updateUser,
  disableUser,
  getAllOrders,
  getOrderById,
} = require("../controllers/users.controller");

// Middlewares
const {
  protectSession,
  protectUserAcoount,
} = require("../middlewares/auth.middleware");
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");

const usersRouter = express.Router();

//Routes
usersRouter.post("/", createUserValidator, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/me", getAllTheUserProducts);

usersRouter.patch("/:id", userExists, protectUserAcoount, updateUser);

usersRouter.delete("/:id", userExists, protectUserAcoount, disableUser);

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", getOrderById);

module.exports = { usersRouter };
