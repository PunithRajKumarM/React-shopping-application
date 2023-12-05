import { createSlice } from "@reduxjs/toolkit";

let initialState = JSON.parse(localStorage.getItem("users")) || [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      let existingUser = state.find(
        (user) =>
          user.userName === action.payload.userName &&
          user.userEmail === action.payload.userEmail
      );
      if (existingUser) {
        alert("User already exist");
        return;
      } else {
        state.push(action.payload);
        let index = state.findIndex(
          (state) => state.userName === action.payload.userName
        );
        let currentUserData = state[index];
        currentUserData["id"] = index;

        localStorage.setItem("users", JSON.stringify(state));
      }
      return state;
    },

    addUserCart(state, action) {
      let loggedUser = state.find((state) => state.isLogin === true); //logged user object
      let existingUserCartProductIndex = loggedUser.userCart.findIndex(
        (product) => product.id === action.payload.id
      ); //checking whether the cart object is already exist or not
      if (existingUserCartProductIndex > -1) {
        let existingUserCartProduct =
          state[loggedUser.id].userCart[existingUserCartProductIndex]; //particular user's cart
        existingUserCartProduct["quantity"]++;
        state[loggedUser.id].userCart[existingUserCartProductIndex] =
          existingUserCartProduct;
      } else {
        // let newProduct = action.payload;
        // newProduct.quantity = 1;
        // state[loggedUser.id].userCart.push(newProduct);
        state[loggedUser.id].userCart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("users", JSON.stringify(state));
      return state;
    },
    removeUserCart(state, action) {
      let loggedUser = state.find((state) => state.isLogin === true);
      let existingUserCartProductIndex = loggedUser.userCart.findIndex(
        (product) => product.id === action.payload.id
      );
      let existingUserCartProduct =
        state[loggedUser.id].userCart[existingUserCartProductIndex];
      if (existingUserCartProduct.quantity === 1) {
        state[loggedUser.id].userCart.splice(existingUserCartProductIndex, 1);
      } else {
        existingUserCartProduct["quantity"]--;
      }
      localStorage.setItem("users", JSON.stringify(state));
      return state;
    },

    addWishList(state, action) {
      let loggedUser = state.find((state) => state.isLogin === true);
      let existingUserWishlistIndex = loggedUser.userWishlist.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingUserWishlistIndex > -1) {
        state[loggedUser.id].userWishlist.splice(existingUserWishlistIndex, 1);
      } else {
        state[loggedUser.id].userWishlist.push(action.payload);
      }
      localStorage.setItem("users", JSON.stringify(state));
      return state;
    },

    userLogin(state, action) {
      let loggedUserIndex = state.findIndex(
        (user) =>
          user.userName === action.payload.userName &&
          user.userEmail === action.payload.userEmail
      );
      let loggedUser = state[loggedUserIndex];
      loggedUser["isLogin"] = true;
      state[loggedUserIndex] = loggedUser;
      localStorage.setItem("users", JSON.stringify(state));
      return state;
    },
    userLogout(state, action) {
      let loggedUserIndex = state.findIndex(
        (user) =>
          user.userName === action.payload.userName &&
          user.userEmail === action.payload.userEmail
      );
      let loggedUser = state[loggedUserIndex];
      loggedUser["isLogin"] = false;
      state[loggedUserIndex] = loggedUser;
      localStorage.setItem("users", JSON.stringify(state));
      return state;
    },
  },
});

export const {
  addUser,
  addUserCart,
  removeUserCart,
  addWishList,
  userLogin,
  userLogout,
} = usersSlice.actions;

export default usersSlice.reducer;
