import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      let existingProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex > -1) {
        let existingProduct = state[existingProductIndex];
        // existingProduct["quantity"]++;
        existingProduct["quantity"] = existingProduct["quantity"] + 1;

        state[existingProductIndex] = existingProduct;
      } else {
        // let newProduct = action.payload;
        // newProduct.quantity = 1;
        // state.push(newProduct);
        state.push({ ...action.payload, quantity: 1 });
      }

      return state;
    },
    removeProduct(state, action) {
      let existingProductIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      let existingProduct = state[existingProductIndex];
      if (existingProduct.quantity === 1) {
        state.splice(existingProductIndex, 1);
      } else {
        // existingProduct["quantity"]--;
        existingProduct["quantity"] = existingProduct["quantity"] - 1;
      }
      return state;
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
