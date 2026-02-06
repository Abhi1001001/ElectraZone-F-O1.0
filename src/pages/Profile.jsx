import { useState } from "react";
import { Mail, ShieldCheck, User, LogOut, Camera, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    profilePic: user?.profilePic || "",
    role: user?.role || "user",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    }); //preview only
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const handleSave = () => {
    console.log("Updated Profile:", updateUser);
    setOpen(false);
    const accessToken = localStorage.getItem("token");
    try {
      //use formdata for text + file upload
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      if (file) {
        formData.append("file", file); //image file for backend multer
      }
      axios
        .put(`${API_URL}/api/v1/users/update/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
        });
    } catch (error) {
      toast.error("failed to update profile");
      console.log(error);
    }
  };

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
    <div className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card */}
        <Card className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-800 h-32" />
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 -mt-12">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="h-28 w-28 rounded-full bg-black shadow-lg flex items-center justify-center overflow-hidden border-4 border-red-600">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-zinc-500" />
                    )}
                  </div>
                  <button className="absolute bottom-1 right-1 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mt-4 text-zinc-200">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-zinc-400">{user.email}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.isVerified && (
                      <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-red-600/15 text-red-500 border border-red-600/30">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-red-500 border border-zinc-700 capitalize">
                      {user.role}
                    </span>
                    {user.isLoggedIn && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-green-500 border border-zinc-700">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-zinc-950 border border-zinc-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="text-red-500">
                        Edit Profile
                      </DialogTitle>
                    </DialogHeader>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {[
                        ["First Name", "firstName"],
                        ["Last Name", "lastName"],
                        ["Email", "email"],
                        ["Phone Number", "phoneNo"],
                      ].map(([label, name]) => (
                        <div key={name} className="space-y-2">
                          <Label className="text-zinc-300">{label}</Label>
                          <Input
                            name={name}
                            value={updateUser[name]}
                            onChange={handleChange}
                            className="bg-zinc-900 border-zinc-700 focus:border-red-600 focus:ring-red-600"
                          />
                        </div>
                      ))}

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-zinc-300">Address</Label>
                        <Textarea
                          name="address"
                          value={updateUser.address}
                          onChange={handleChange}
                          className="bg-zinc-900 border-zinc-700 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">City</Label>
                        <Input
                          name="city"
                          value={updateUser.city}
                          onChange={handleChange}
                          className="bg-zinc-900 border-zinc-700 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Zip Code</Label>
                        <Input
                          name="zipCode"
                          value={updateUser.zipCode}
                          onChange={handleChange}
                          className="bg-zinc-900 border-zinc-700 focus:border-red-600 focus:ring-red-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Profile Picture</Label>
                        <Input
                          type="file"
                          name="profilePic"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="bg-zinc-900 border-zinc-700 file:text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Role</Label>
                        <Select
                          value={updateUser.role}
                          onValueChange={(value) =>
                            setUpdateUser({ ...updateUser, role: value })
                          }
                        >
                          <SelectTrigger className="bg-zinc-900 border-zinc-700 focus:border-red-600 text-zinc-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-500">
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="border-zinc-700 text-zinc-600 hover:bg-zinc-800"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleLogout}
                  className="bg-red-700 hover:bg-red-800 text-white flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card className="bg-zinc-900 border border-zinc-800 rounded-xl shadow">
            <CardHeader>
              <CardTitle className="text-red-500 text-lg">
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {[
                ["First Name", user.firstName],
                ["Last Name", user.lastName],
                ["Email", user.email],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-zinc-800 pb-2"
                >
                  <span className="text-zinc-400">{label}</span>
                  <span className="font-medium text-zinc-200">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="bg-zinc-900 border border-zinc-800 rounded-xl shadow">
            <CardHeader>
              <CardTitle className="text-red-500 text-lg">
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Role</span>
                <span className="font-medium capitalize text-red-500">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Verified</span>
                <span className="font-medium text-green-500">
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Status</span>
                <span className="font-medium text-green-500">
                  {user.isLoggedIn ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Joined</span>
                <span className="font-medium text-zinc-200">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
