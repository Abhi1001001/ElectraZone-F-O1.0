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
      <>
      <Navbar/>
        <Profile />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
      <Navbar/>
        <Products />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
      <Navbar/>
        <Cart />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
      <Navbar/>
        <Dashboard />
      </>
    ),
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
