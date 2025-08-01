import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/protected/Dashboard";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import UserLayout from "../layouts/UserLayout";
import TopUp from "../pages/protected/TopUp";
import TransactionHistory from "../pages/protected/TransactionHistory";
import Transaction from "../pages/protected/Transaction";
import Profile from "../pages/protected/Profile";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "topup", element: <TopUp /> },
          { path: "transaction/history", element: <TransactionHistory /> },
          { path: "transaction/:name", element: <Transaction /> },
        ],
      },
      { path: "akun", element: <Profile /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
