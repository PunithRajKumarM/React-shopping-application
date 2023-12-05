import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/modalSlice";
import Cart from "../UI/Cart";
import { searchProduct } from "../store/searchSlice";

export default function MainNavigation() {
  // const cart = useSelector((state) => state.cart);

  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);
  const dispatch = useDispatch();
  // let totalCartItems = cart.reduce((totalNumberOfProducts, product) => {
  //   return totalNumberOfProducts + product.quantity;
  // }, 0);
  let totalCartItems;
  if (isLogged) {
    totalCartItems = isLogged.userCart.reduce(
      (totalNumberOfProducts, product) => {
        return totalNumberOfProducts + product.quantity;
      },
      0
    );
  }

  function handleCartOpen() {
    dispatch(showModal());
  }

  function handleInputSearchHandler(event) {
    let searchedText = event.target.value;
    dispatch(searchProduct(searchedText));
    // let originalData = DUMMY_DATA.filter((data) => {
    //   return data.title.toLowerCase().includes(searchedText);
    // });
    // setSearchedProduct(originalData);
  }

  

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <Link to="/">
            <p className="shopping-logo">
              Shop<span>Kart</span>
            </p>
          </Link>
          {isLogged && (
            <>
              <input
                className="search-bar"
                type="text"
                placeholder="Search products"
                onChange={handleInputSearchHandler}
              />
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "categories"
                }
                to="/categories"
              >
                Categories
              </NavLink>
              <div className="navbar-button-and-profile">
                <Button
                  textOnly
                  className="cart-button"
                  onClick={handleCartOpen}
                >
                  Cart <span>({totalCartItems})</span>
                </Button>
                <Link to="/admin" className="admin-profile-logo">
                  {isLogged.userName.charAt(0)}
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>
      <Cart />
    </>
  );
}
