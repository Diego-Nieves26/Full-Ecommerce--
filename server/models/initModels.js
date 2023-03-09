const initModels = () => {
  const { ProductsInCart } = require("./productsInCart.model");
  const { ProductImg } = require("./productImg.model");
  const { Category } = require("./categories.model");
  const { Product } = require("./product.model");
  const { Order } = require("./order.model");
  const { Cart } = require("./cart.model");
  const { User } = require("./user.model");

  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  User.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(User);

  Cart.hasOne(Order, { foreignKey: "cartId" });
  Order.belongsTo(Cart);

  Cart.hasMany(ProductsInCart, { foreignKey: "cartId" });
  ProductsInCart.belongsTo(Cart);

  Product.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(Product);

  Product.hasOne(ProductsInCart, { foreignKey: "productId" });
  ProductsInCart.belongsTo(Product);

  Category.hasOne(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
};

module.exports = { initModels };
