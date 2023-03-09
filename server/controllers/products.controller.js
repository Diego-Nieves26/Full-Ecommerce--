const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Models
const { Product } = require("../models/product.model");
const { Category } = require("../models/categories.model");
const { ProductImg } = require("../models/productImg.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { storage } = require("../utils/firebase.util");

const createProduct = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { title, description, price, categoryId, quantity } = req.body;

  const category = await Category.findOne({
    where: { id: categoryId, status: "active" },
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    categoryId,
    userId: sessionUser.id,
  });

  // Imgs
  if (req.files.length > 0) {
    const filesPromises = req.files.map(async (file) => {
      const imgRef = ref(
        storage,
        `products/${Date.now()}_${file.originalname}`
      );
      const imgRes = await uploadBytes(imgRef, file.buffer);

      return await ProductImg.create({
        imgUrl: imgRes.metadata.fullPath,
        productId: newProduct.id,
      });
    });

    await Promise.all(filesPromises);
  }

  res.status(201).json({
    status: "success",
    newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: "active" },
    include: { model: ProductImg },
  });

  const uwu = products.map(async (product) => {
    const postImgsPromises = product.productImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.imgUrl);

      const imgFullPath = await getDownloadURL(imgRef);

      postImg.imgUrl = imgFullPath;
    });

    await Promise.all(postImgsPromises);
  });

  await Promise.all(uwu);

  res.status(200).json({
    status: "success",
    products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  const postImgsPromises = product.productImgs.map(async (postImg) => {
    const imgRef = ref(storage, postImg.imgUrl);

    const imgFullPath = await getDownloadURL(imgRef);

    postImg.imgUrl = imgFullPath;
  });

  await Promise.all(postImgsPromises);

  res.status(200).json({
    status: "success",
    product,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, description, price, quantity } = req.body;

  await product.update({
    title,
    description,
    price,
    quantity,
  });

  res.status(204).json({ status: "success" });
});

const disableProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "disable" });

  res.status(204).json({ status: "success" });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    categories,
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  res.status(200).json({
    status: "success",
    newCategory,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOne({ where: { id, status: "active" } });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  await category.update({ name });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  disableProduct,
  getAllCategories,
  createCategory,
  updateCategory,
};
