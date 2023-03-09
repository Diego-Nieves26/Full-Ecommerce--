import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    setIsLoading: (state, action) => action.payload,
  },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
