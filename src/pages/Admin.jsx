import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/usersSlice";
import { DUMMY_DATA } from "../dummyData/data";

export default function AdminPage() {
  const [loggedUser, setLoggedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);
  console.log("wishlist", isLogged.userWishlist);
  console.log("cart", isLogged.userCart);
  console.log(DUMMY_DATA.flatMap((state) => state));

  useEffect(() => {
    if (isLogged) {
      setLoggedUser(loggedUser);
    } else {
      setLoggedUser(null);
    }
  }, [users]);

  function handleLogout() {
    dispatch(userLogout(isLogged));
    navigate("/");
  }

  return (
    <>
      {isLogged && (
        <div className="admin-page">
          <Button textOnly className="back-button">
            <Link to="/">&lt;Back</Link>
          </Button>
          <div className="admin-details">
            <header className="admin-header">
              <div className="admin-logo">{isLogged.userName.charAt(0)}</div>
              <h2 className="admin-name">{isLogged.userName}</h2>
              {/* <Button className="admin-profile-edit">
                <Link to="/">Edit admin name</Link>
              </Button> */}
            </header>
            <div className="admin-wishlists">
              <h2>My wishlist</h2>
              <div className="admin-wishlists-items">
                {isLogged && isLogged.userWishlist.length === 0 && (
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: "10px 0",
                    }}
                  >
                    No wishlist items
                  </p>
                )}
                {isLogged && isLogged.userWishlist.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flex: "flexWrap",
                      justifyContent: "center",
                    }}
                  >
                    {isLogged &&
                      isLogged.userWishlist.map((product) => (
                        <li key={product.id}>
                          <img
                            className="admin-product-image"
                            src={product.src}
                            alt={product.title}
                            onClick={() => {
                              navigate(`/categories/${product.id}`);
                            }}
                          />
                        </li>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className="admin-cart-items">
              <h2>My cart</h2>
              <div>
                {isLogged && isLogged.userCart.length === 0 && (
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: "10px 0",
                    }}
                  >
                    No cart items
                  </p>
                )}

                {isLogged && isLogged.userWishlist.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      flex: "flexWrap",
                      justifyContent: "center",
                    }}
                  >
                    {isLogged &&
                      isLogged.userCart.map((product) => (
                        <li key={product.id} style={{ paddingTop: "1rem" }}>
                          <img
                            className="admin-product-image"
                            src={product.src}
                            alt={product.title}
                            onClick={() => {
                              navigate(`/categories/${product.id}`);
                            }}
                          />
                        </li>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <Button onClick={handleLogout} className="logout">
              Log out
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
