import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Collection from "./pages/Collection";
import ProductDetails from "./pages/ProductDetails";
import AdminSales from "./pages/admin/AdminSales";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import UserOrders from "./pages/admin/UserOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserInfo from "./pages/admin/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/collections/:category",
    element: (
      <>
        <Navbar />
        <Collection />
      </>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <>
        <Navbar />
        <ProductDetails />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute adminOnly={true}>
        {" "}
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
    children: [
      {
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "users/orders/:userId",
        element: <UserOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:userId",
        element: <UserInfo />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
