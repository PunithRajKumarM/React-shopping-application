import React from "react";
import Items from "../components/Items";
import { useSelector } from "react-redux";

export default function Categories() {
  let users = useSelector((state) => state.users);
  const isLogged = users.find((user) => user.isLogin === true);
  return <>{isLogged && <Items />}</>;
}
