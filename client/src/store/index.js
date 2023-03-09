import categories from "./slices/categories.slice";
import { configureStore } from "@reduxjs/toolkit";
import purchases from "./slices/purchases.slice";
import products from "./slices/products.slice";
import loading from "./slices/loading.slice";
import modal from "./slices/modal.slice";
import cart from "./slices/cart.slice";

export default configureStore({
  reducer: {
    categories,
    purchases,
    products,
    loading,
    modal,
    cart,
  },
});
