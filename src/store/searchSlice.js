import { createSlice } from "@reduxjs/toolkit";

let initialState = { searchedText: "" };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchProduct(state, action) {
      state.searchedText = action.payload;
    },
  },
});

export const { searchProduct } = searchSlice.actions;
export default searchSlice.reducer;
