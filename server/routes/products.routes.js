const express = require("express");

// Controllers
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  disableProduct,
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/products.controller");

// Middlewares
const { protectSession } = require("../middlewares/auth.middleware");
const {
  productExist,
  userProduct,
} = require("../middlewares/products.middleware");
const {
  createProductValidator,
} = require("../middlewares/validators.middleware");

// Utils
const { upload } = require("../utils/upload.util");

const productsRouter = express.Router();

//Routes
productsRouter.get("/", getAllProducts);

productsRouter.get("/categories", getAllCategories);

productsRouter.get("/:id", productExist, getProductById);

productsRouter.use(protectSession);

productsRouter.post(
  "/",
  upload.array("image", 5),
  createProductValidator,
  createProduct
);

productsRouter.patch("/:id", productExist, userProduct, updateProduct);

productsRouter.delete("/:id", productExist, userProduct, disableProduct);

productsRouter.post("/categories", createCategory);

productsRouter.patch("/categories/:id", updateCategory);

module.exports = { productsRouter };
