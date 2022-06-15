import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./loading.slice";
import getConfig from "../../utils/getConfig";

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => action.payload,
  },
});

export const { setPurchases } = purchaseSlice.actions;

export const getPurchases = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data.data.purchases)))
    .finally(() => dispatch(setIsLoading(false)));
};

export default purchaseSlice.reducer;
