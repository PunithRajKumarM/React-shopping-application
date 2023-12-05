import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../store/usersSlice";
import { login } from "../store/authSlice";

export default function SignupPage() {
  const [checkingPassword, setCheckingPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);
  let newData;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted");
    const formData = new FormData(event.target);
    const userPassword = formData.get("userPassword");
    const confirmPassword = formData.get("confirmPassword");
    if (userPassword !== confirmPassword) {
      // alert("Enter correct password");
      setCheckingPassword(true);
      return;
    } else {
      newData = {
        userName: formData.get("userName"),
        userPassword: formData.get("userPassword"),
        userEmail: formData.get("userEmail"),
        userCart: [],
        userWishlist: [],
        isLogin: true,
      };
      dispatch(addUser(newData));
      dispatch(login());
      navigate("/");
      console.log(JSON.parse(localStorage.getItem("users")));
    }
    event.target.reset();
  }

  return (
    <>
      {!isLogged && (
        <div className="signup-page-wrapper">
          <div className="sigup-page">
            <h2>Register now</h2>
            <form className="signup-page-form" onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="signup-username">Enter username</label>
                    </td>
                    <td>
                      <input
                        id="signup-username"
                        name="userName"
                        type="text"
                        autoComplete="off"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="signup-email">Enter email ID</label>
                    </td>
                    <td>
                      <input
                        id="signup-email"
                        name="userEmail"
                        type="email"
                        autoComplete="off"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="signup-password">Enter password</label>
                    </td>
                    <td>
                      <input
                        id="signup-password"
                        name="userPassword"
                        type="password"
                        autoComplete="off"
                        required
                        onFocus={() => {
                          setCheckingPassword(false);
                        }}
                        onBlur={() => {
                          setCheckingPassword(false);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="signup-confirm-password">
                        Confirm password
                      </label>
                    </td>
                    <td>
                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        autoComplete="off"
                        required
                        onFocus={() => {
                          setCheckingPassword(false);
                        }}
                        onBlur={() => {
                          setCheckingPassword(false);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Sign up</button>
            </form>
            {checkingPassword && (
              <p
                style={{
                  color: "red",
                  fontSize: "small",
                  textAlign: "right",
                  marginTop: "2px",
                  paddingBottom: "0",
                }}
              >
                incorrect password
              </p>
            )}
            <p className="already-user-link">
              Already an user? <Link to="/">login.</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
