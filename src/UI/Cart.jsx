import React from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal } from "../store/modalSlice";
import CartItem from "./CartItem";
import { addProduct, removeProduct } from "../store/cartSlice";
import { currencyFormatter } from "../formatter";
import Button from "./Button";
import { addUserCart, removeUserCart } from "../store/usersSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  const loggedUser = users.find((user) => user.isLogin === true);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  let cartTotal;

  // let cartTotal = cart.reduce(
  //   (totalPrice, product) => totalPrice + product.price * product.quantity,
  //   0
  // );
  if (loggedUser) {
    cartTotal = loggedUser.userCart.reduce(
      (totalPrice, product) => totalPrice + product.price * product.quantity,
      0
    );
  }

  // function handleShowModal() {
  //   dispatch(showModal());
  // }

  function handleHideModal() {
    dispatch(hideModal());
  }

  function handleAddProduct(product) {
    // dispatch(addProduct(product));
    dispatch(addUserCart(product));
  }

  function handleRemoveProduct(product) {
    // dispatch(removeProduct(product));
    dispatch(removeUserCart(product));
  }

  return (
    <>
      {loggedUser && (
        <>
          <Modal
            open={modal.progress === "showModal"}
            close={modal.progress === "showModal" ? handleHideModal : null}
          >
            <h2>Your cart</h2>
            <ul className="list-cart-details">
              {loggedUser.userCart.map((product) => (
                <CartItem
                  key={product.id}
                  {...product}
                  onIncrease={() => {
                    handleAddProduct(product);
                  }}
                  onDecrease={() => {
                    handleRemoveProduct(product);
                  }}
                />
              ))}
            </ul>
            {loggedUser.userCart.length === 0 && (
              <p
                style={{
                  padding: "0.5rem",
                  textAlign: "center",
                  fontSize: "large",
                  color: "#15103b",
                  fontWeight: "600",
                }}
              >
                Empty cart
              </p>
            )}
            {loggedUser.userCart.length > 0 && (
              <div className="cart-total-amount">
                <span>Total amount</span>
                <p>{currencyFormatter.format(cartTotal)}</p>
              </div>
            )}

            <div className="cart-close-modal">
              <Button
                className="cart-close-button"
                textOnly
                onClick={handleHideModal}
              >
                Close
              </Button>
              {loggedUser.userCart.length > 0 && (
                <Button className="cart-order-now-button">Order now</Button>
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
