import React from "react";
import AvailableProducts from "../components/AvailableProducts";
import LoginPage from "../pages/Login";
import { useSelector } from "react-redux";
export default function HomePage() {
  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);

  return (
    <>
      {isLogged && <AvailableProducts />}
      {!isLogged && <LoginPage />}
    </>
  );
}
