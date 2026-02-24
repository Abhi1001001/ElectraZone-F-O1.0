import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(loading);
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // if (formData.password !== formData.confirmPassword) {
    //   return setError("Passwords do not match");
    // }

    setError("");
    // console.log("Signup Data:", formData);
    try {
      axios
        .post(`${API_URL}/users/register`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          //   console.log(res.data);
          navigate("/verify");
          toast.success(res.data.message);
          setLoading(false);
        })
        .catch((err) => {
          //   console.log(err);
          toast.error(err.response.data.message);
          setLoading(false);
        });
    } catch (error) {
      return (setError(error.response.data.message), setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-950 px-4">
      <Card className="w-full max-w-md bg-black text-white shadow-2xl rounded-2xl border border-red-600/40">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-red-500">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Join us and start shopping smarter 🛒
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex gap-3">
              <div className="space-y-2 w-full">
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 focus:border-red-500 focus:ring-red-500 text-white"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 focus:border-red-500 focus:ring-red-500 text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-900 border-gray-700 focus:border-red-500 focus:ring-red-500 text-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="flex justify-between items-center relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 focus:border-red-500 focus:ring-red-500 text-white pr-10"
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-red-500"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-red-500"
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <div className="flex justify-between items-center relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 focus:border-red-500 focus:ring-red-500 text-white pr-10"
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-red-500"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-400 hover:text-red-500"
                  />
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Please wait...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <Separator className="bg-gray-800" />

            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
