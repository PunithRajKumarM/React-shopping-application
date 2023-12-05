import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import modalSliceReducer from "./modalSlice";
import authSliceReducer from "./authSlice";
import usersSliceReducer from "./usersSlice";
import searchSliceReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    modal: modalSliceReducer,
    auth: authSliceReducer,
    users: usersSliceReducer,
    search: searchSliceReducer,
  },
});
export default store;
