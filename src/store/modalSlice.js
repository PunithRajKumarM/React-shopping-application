import { createSlice } from "@reduxjs/toolkit";

let initialState = { progress: "" };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state) {
      state.progress = "showModal";
    },
    hideModal(state) {
      state.progress = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
