import { createSlice } from "@reduxjs/toolkit";

let initialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    signup(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, signup } = authSlice.actions;

export default authSlice.reducer;
