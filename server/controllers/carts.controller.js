// Models
const { Cart } = require("../models/cart.model");
const { Order } = require("../models/order.model");
const { Product } = require("../models/product.model");
const { ProductsInCart } = require("../models/productsInCart.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Email } = require("../utils/email.util");

const addProduct = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser, product } = req;

  if (quantity > product.quantity) {
    return next(new AppError("The quantity exceeds the stock", 404));
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });

  if (!cart) {
    const newCart = await Cart.create({ userId: sessionUser.id });

    await ProductsInCart.create({
      cartId: newCart.id,
      productId,
      quantity,
    });
  } else {
    const productInCart = await ProductsInCart.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!productInCart) {
      await ProductsInCart.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    } else {
      if (
        productInCart.productId === productId &&
        productInCart.status === "active"
      ) {
        return next(new AppError("The product is already added", 404));
      } else if (
        productInCart.productId === productId &&
        productInCart.status === "removed"
      ) {
        await productInCart.update({
          quantity,
          status: "active",
        });
      }
    }
  }

  res.status(201).json({ status: "success" });
});

const updateCart = catchAsync(async (req, res, next) => {
  const { cart, product } = req;
  const { productId, newQty } = req.body;

  if (newQty > product.quantity) {
    return next(new AppError("Exceeded stock", 404));
  }

  const productInCart = await ProductsInCart.findOne({
    where: {
      productId,
      cartId: cart.id,
    },
  });

  if (!productInCart) {
    return next(new AppError("Product not found", 404));
  }

  if (newQty === 0) {
    await productInCart.update({ quantity: 0, status: "removed" });
  }

  if (newQty > 0) {
    await productInCart.update({ quantity: newQty, status: "active" });
  }

  res.status(204).json({ status: "success" });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  const { cart } = req;
  const { productId } = req.params;

  const product = await ProductsInCart.findOne({
    where: {
      cartId: cart.id,
      productId,
      status: "active",
    },
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  await product.update({ quantity: 0, status: "removed" });

  res.status(204).json({ status: "success" });
});

const purchase = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  let totalPriceCart = 0;
  let productData = [];

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: "active" },
    include: { model: ProductsInCart, where: { status: "active" } },
  });

  if (!cart) {
    return next(new AppError("Add some products", 404));
  }

  const nashe = cart.productsInCarts.map(async (productInCart) => {
    const product = await Product.findOne({
      where: { id: productInCart.productId },
    });

    productData.push({
      name: product.title,
      priceUnt: product.price,
      quantity: productInCart.quantity,
    });

    totalPriceCart += product.price * productInCart.quantity;

    await product.update({
      quantity: product.quantity - productInCart.quantity,
    });

    await productInCart.update({ status: "purchased" });
  });

  await Promise.all(nashe);

  await cart.update({ status: "purchased" });

  const order = await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice: totalPriceCart,
  });

  const emailData = {
    totalPrice: totalPriceCart,
    productData,
  };

  await new Email().sendPurchased({
    username: sessionUser.name,
    email: sessionUser.email,
    emailData,
  });

  res.status(204).json({ status: "success", order });
});

module.exports = {
  addProduct,
  updateCart,
  removeProductFromCart,
  purchase,
};
