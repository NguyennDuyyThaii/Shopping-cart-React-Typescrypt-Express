import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductState {
  items: [];
  status: "pending" | "success" | null;
  error: string | null
}

const initialState: ProductState = {
  items: [],
  status: null,
  error: null
};

export const productsFetch: any = createAsyncThunk(
  "products/productsFetch",
  async () => {
      const response = await axios.get("http://localhost:5000/product");
      return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "pending";
      state.error = action.error
    },
  },
});

export default productsSlice.reducer;
