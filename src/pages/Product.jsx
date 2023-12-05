import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_DATA } from "../dummyData/data";
import { currencyFormatter } from "../formatter";
import CartIncDecButton from "../UI/CartIncDecButton";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../store/cartSlice";
import Button from "../UI/Button";
import { addUserCart, addWishList, removeUserCart } from "../store/usersSlice";
import WishlistButton from "../components/WishlistButton";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);

  const params = useParams();
  const dispatch = useDispatch();
  // const storeProducts = useSelector((state) => state.cart);
  // console.log(storeProducts);

  useEffect(() => {
    const products = DUMMY_DATA.flatMap((item) => item.product).find(
      (product) => product.id === params.productId
    );
    setSelectedProduct({ ...products });

    const category = DUMMY_DATA.find((cat) => {
      return cat.product.some((el) => el.id === params.productId);
    });

    setSelectedCategory(category);
  }, [params.productId]);

  function handleAddProduct(product) {
    // dispatch(addProduct(product));
    dispatch(addUserCart(product));
  }

  function handleRemoveProduct(product) {
    // dispatch(removeProduct(product));
    dispatch(removeUserCart(product));
  }

  function handleWishList(product) {
    console.log("dispatched");
    dispatch(addWishList(product));
    console.log(product);
  }

  return (
    <>
      {isLogged && (
        <div className="display-product">
          <div className="display-product-image">
            <img src={selectedProduct.src} alt={selectedProduct.title} />
          </div>
          <div className="display-product-details">
            <div className="display-product-details-wrapper">
              <h1>{selectedProduct.title}</h1>
              <p>
                <span>Category: </span>
                {selectedCategory.category}
              </p>
              <p>
                <span>Price: </span>
                {currencyFormatter.format(selectedProduct.price)}
              </p>
              <div className="add-to-wishlist">
                <span>Add to wishlist: </span>
                <WishlistButton
                  {...selectedProduct}
                  onClick={() => {
                    handleWishList(selectedProduct);
                  }}
                />
              </div>

              <p>
                <span>Description: </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita dolorum fugiat sapiente molestiae assumenda nisi error
                beatae rerum quas maxime!
              </p>

              {isLogged.userCart.find(
                (prod) => prod.id === selectedProduct.id
              ) && (
                <CartIncDecButton
                  {...isLogged.userCart.find(
                    (prod) => prod.id === selectedProduct.id
                  )}
                  onAdd={() => {
                    handleAddProduct(selectedProduct);
                  }}
                  onRemove={() => {
                    handleRemoveProduct(selectedProduct);
                  }}
                >
                  <p className="display-product-quantity">Quantity: </p>
                </CartIncDecButton>
              )}

              {!isLogged.userCart.find(
                (prod) => prod.id === selectedProduct.id
              ) && (
                <Button
                  className="display-product-add-to-cart"
                  onClick={() => {
                    handleAddProduct(selectedProduct);
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
