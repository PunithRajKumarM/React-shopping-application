import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/usersSlice";

export default function AdminPage() {
  const [loggedUser, setLoggedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);

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
              <div>
                {isLogged.userWishlist.length === 0 && (
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
                {isLogged.userWishlist.length > 0 && (
                  <div>
                    {isLogged.userWishlist.map((product) => (
                      <li key={product.id}>
                        <p
                          style={{
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          {product.title}
                        </p>
                      </li>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="admin-cart-items">
              <h2>My cart</h2>
              <div>
                {isLogged.userCart.length === 0 && (
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
                {isLogged.userCart.length > 0 && (
                  <div>
                    {isLogged.userCart.map((product) => (
                      <li key={product.id}>
                        <p
                          style={{
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          {product.title}
                        </p>
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
