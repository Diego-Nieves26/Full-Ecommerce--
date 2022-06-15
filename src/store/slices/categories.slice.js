import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./loading.slice";

export const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategory: (state, action) => action.payload,
  },
});

export const { setCategory } = categorySlice.actions;

export const getCategories = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
    .then((res) => dispatch(setCategory(res.data.data.categories)))
    .finally(() => dispatch(setIsLoading(false)));
};

export default categorySlice.reducer;
