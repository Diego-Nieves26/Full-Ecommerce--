const express = require("express");

// Controllers
const {
  addProduct,
  updateCart,
  removeProductFromCart,
  purchase,
} = require("../controllers/carts.controller");

// Middlewares
const { protectSession } = require("../middlewares/auth.middleware");
const { cartExist, productExists } = require("../middlewares/cart.middleware");

const cartsRouter = express.Router();

// Routes
cartsRouter.use(protectSession);

cartsRouter.post("/add-product", productExists, addProduct);

cartsRouter.patch("/update-cart", cartExist, productExists, updateCart);

cartsRouter.delete("/:productId", cartExist, removeProductFromCart);

cartsRouter.post("/purchase", purchase);

module.exports = { cartsRouter };
