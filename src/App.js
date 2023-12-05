import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Categories from "./pages/Categories";
import RootLayout from "./root/RootLayout";
import HomePage from "./pages/Home";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";
import Product from "./pages/Product";
import { Provider } from "react-redux";
import store from "./store/store";
import SignupPage from "./pages/Signup";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: "categories", element: <Categories /> },
        { path: "categories/:productId", element: <Product /> },
        { path: "contact", element: <ContactPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
    { path: "admin", element: <AdminPage /> },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}
