import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   productData : []
}

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts : (state, action) => {
      state.push(action.payload);
    },
    // searchProduct(state, action) {},
  },
});

// console.log(ProductSlice.actions);
export default ProductSlice.reducer;
export const { addProducts } = ProductSlice.actions;
