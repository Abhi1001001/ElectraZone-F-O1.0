import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Menu, User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // const user = true;
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const admin = user?.role === "admin" ? true : false;
  console.log("cart from navbar", cart);

  const handleLogout = () => {
    // Perform logout logic here
    axios
      .post(
        `${API_URL}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(setUser(null));
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-red-500 tracking-wide">
          ElectraZone
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-7">
          {admin && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-zinc-300 hover:text-red-500 transition"
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/products"
            className="text-sm font-medium text-zinc-300 hover:text-red-500 transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-red-500"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            <span className="ml-1 text-xs bg-red-500 text-black rounded-full px-2 py-0.5 font-semibold">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-zinc-300 hover:text-red-500 hover:bg-zinc-900"
                >
                  <User className="h-4 w-4" />
                  {user.firstName}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-black border border-zinc-800 text-zinc-200"
              >
                <DropdownMenuItem asChild className="hover:bg-zinc-900">
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-zinc-900"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="bg-red-500 text-black hover:bg-red-600"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-200"
          onClick={() => setOpen(!open)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-black px-4 py-4 space-y-3">
          {admin && (
            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-zinc-300 hover:text-red-500 transition"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Separator className="bg-zinc-800" />
            </div>
          )}

          <Link
            to="/products"
            className="block text-sm font-medium text-zinc-300 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Separator className="bg-zinc-800" />

          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-red-500"
            onClick={() => setOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
          <Separator className="bg-zinc-800" />

          {user ? (
            <>
              <p className="text-sm text-zinc-400">
                Logged in as{" "}
                <Link className="font-semibold" to={`/profile/${user._id}`}>
                  {user.firstName}
                </Link>
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full bg-red-500 text-black hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="w-full bg-red-500 text-black hover:bg-red-600"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
