import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../store/usersSlice";
import { login } from "../store/authSlice";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isError, setIsError] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const isLogged = users.find((user) => user.isLogin === true);

  function handleLogin() {
    let alreadyUser = users.find((user) => user?.userName === userName);
    if (alreadyUser) {
      if (alreadyUser.userPassword !== userPassword) {
        // alert("Password is incorrect");
        setIsPasswordCorrect(true);
      } else {
        dispatch(userLogin(alreadyUser));
        dispatch(login());
      }
    } else {
      setIsError(true);
    }
    setUserName("");
    setUserPassword("");
  }

  return (
    <>
      {!isLogged && (
        <div className="login-page-wrapper">
          <div className="login-page">
            <h2>Login</h2>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="login-username">Username</label>
                  </td>
                  <td>
                    <input
                      id="login-username"
                      type="text"
                      value={userName}
                      required
                      autoComplete="off"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      onFocus={() => {
                        setIsError(false);
                        setIsPasswordCorrect(false);
                      }}
                      onBlur={() => {
                        setIsError(false);
                        setIsPasswordCorrect(false);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="login-password">Password</label>
                  </td>
                  <td>
                    <input
                      id="login-password"
                      type="password"
                      value={userPassword}
                      required
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                      onFocus={() => {
                        setIsError(false);
                        setIsPasswordCorrect(false);
                      }}
                      onBlur={() => {
                        setIsError(false);
                        setIsPasswordCorrect(false);
                      }}
                    />
                    {isPasswordCorrect && (
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
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={handleLogin}>Login</button>
            {isError && (
              <p
                style={{
                  color: "red",
                  fontSize: "small",
                  textAlign: "center",
                  paddingBottom: "0",
                }}
              >
                User not found, try to signup.
              </p>
            )}
            <p className="new-user-link">
              New user? <Link to="/signup">sign up.</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
