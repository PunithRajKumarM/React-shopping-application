import { DUMMY_DATA } from "../dummyData/data";
import { currencyFormatter } from "../formatter";
import { Link } from "react-router-dom";
import CartIncDecButton from "../UI/CartIncDecButton";
import { addProduct, removeProduct } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { addUserCart, addWishList, removeUserCart } from "../store/usersSlice";
import WishlistButton from "./WishlistButton";
import { useState } from "react";

export default function Items() {
  const dispatch = useDispatch();
  // const cartProduct = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  let loggedUser = users.find((user) => user.isLogin === true);

  function handleAddProduct(product) {
    // dispatch(addProduct(product));
    dispatch(addUserCart(product));
  }

  function handleRemoveProduct(product) {
    // dispatch(removeProduct(product));
    dispatch(removeUserCart(product));
  }

  // function handleWishlist(productId) {
  //   setWishlist((pre) => !pre);
  //   dispatch(addWishList(productId));
  // }

  return (
    <div className="list-items">
      {DUMMY_DATA.map((category) => (
        <div className="list-items-category" key={category.id}>
          <h1>{category.category}</h1>
          {category.product.map((item) => (
            <div key={item.id} className="list-item">
              <Link to={`/categories/${item.id}`} className="list-item-info">
                <img src={item.src} alt={item.title} />
                <div>
                  <h2>{item.title}</h2>
                  <p>
                    Price : <span>{currencyFormatter.format(item.price)}</span>
                  </p>
                </div>
              </Link>

              {loggedUser.userCart.find(
                (product) => product.id === item.id
              ) && (
                <CartIncDecButton
                  {...loggedUser.userCart.find(
                    (product) => product.id === item.id
                  )}
                  onAdd={() => handleAddProduct(item)}
                  onRemove={() => handleRemoveProduct(item)}
                  className="items-cart-button"
                ></CartIncDecButton>
              )}
              {!loggedUser.userCart.find(
                (product) => product.id === item.id
              ) && (
                <Button
                  className="add-to-cart"
                  onClick={() => handleAddProduct(item)}
                >
                  Add to cart
                </Button>
              )}
              {/* {cartProduct.find((product) => product.id === item.id) && (
                <CartIncDecButton
                  {...cartProduct.find((product) => product.id === item.id)}
                  onAdd={() => handleAddProduct(item)}
                  onRemove={() => handleRemoveProduct(item)}
                  className="items-cart-button"
                ></CartIncDecButton>
              )}

              {!cartProduct.find((product) => product.id === item.id) && (
                <Button
                  className="add-to-cart"
                  onClick={() => handleAddProduct(item)}
                >
                  Add to cart
                </Button>
              )} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
