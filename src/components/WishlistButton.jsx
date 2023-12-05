import { useState } from "react";
import AddWishlistImg from "../assets/WishListLogo.png";
import NoneWishlistImg from "../assets/WishListNoneLogo.png";
import { useSelector } from "react-redux";

export default function WishlistButton({ id, onWishlistAdd, ...props }) {
  let users = useSelector((state) => state.users);
  let wishlistImage;
  const isLogged = users.find((user) => user.isLogin === true);
  const findWishlistproduct =
    isLogged && isLogged.userWishlist.find((product) => product.id === id);
  if (findWishlistproduct) {
    wishlistImage = AddWishlistImg;
  } else {
    wishlistImage = NoneWishlistImg;
  }
  return (
    <div
      className="wishlist-icon"
      {...props}
      style={{ backgroundImage: `url(${wishlistImage})` }}
    ></div>
  );
}
