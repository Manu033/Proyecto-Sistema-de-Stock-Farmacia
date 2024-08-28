import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import NewProductPage from "../pages/NewProductPage";
import MovementsPage from "../pages/MovementsPage";
import LogisticsDispatchPage from "../pages/LogisticsDispatchPage";


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "",
        element: <ProductsPage />,
      },
      {
        path: "new",
        element: <NewProductPage />,
      },
      {
        path: "movements",
        element: <MovementsPage />,
      },
      {
        path: "logistics", 
        element: <LogisticsDispatchPage />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppRouter = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default AppRouter;
