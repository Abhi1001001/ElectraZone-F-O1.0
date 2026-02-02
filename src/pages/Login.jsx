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
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }
    setError("");
    try {
      axios
        .post("http://localhost:4000/api/v1/users/login", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data);
          // Store token
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to continue shopping 🛍️</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex justify-between items-center relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <EyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer"
                  />
                ) : (
                  <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 cursor-pointer"
                  />
                )}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full rounded-xl">
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Please wait...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground cursor-pointer hover:underline">
                Forgot password?
              </span>
              <Link
                to="/signup"
                className="text-primary cursor-pointer hover:underline"
              >
                Create account
              </Link>
            </div>

            <Separator />

            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary cursor-pointer hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
