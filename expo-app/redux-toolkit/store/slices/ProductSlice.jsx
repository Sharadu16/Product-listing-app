import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list : [],
}

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts : (state,action) => {
        // console.log("action ---------------------",action.payload);
        state.list = action.payload;
    },

  },
});

// console.log(ProductSlice.actions);
export default ProductSlice.reducer;
export const { addProducts} = ProductSlice.actions;
