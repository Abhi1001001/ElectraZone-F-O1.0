import { useState } from "react";
import { Link } from "react-router-dom";
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
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary font-serif">
          ElectraZone
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {admin && (
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/products"
            className="text-sm font-medium hover:text-primary transition"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-sm font-medium hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-2 py-0.5">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.firstName}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${user._id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          {admin && (
            <div className="flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition"
            >
              Dashboard
            </Link>
            <Separator />
            </div>
          )}
          
          <Link
            to="/products"
            className="block text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Separator />

          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
          <Separator />

          {user ? (
            <>
              <p className="text-sm text-muted-foreground">
                Logged in as <strong>{user.firstName}</strong>
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
