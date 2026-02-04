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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Card */}
        <Card className="shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32" />
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 -mt-12">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="h-28 w-28 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border-4 border-white">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-1 right-1 bg-black text-white p-1.5 rounded-full hover:bg-gray-800">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mt-4">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.isVerified && (
                      <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
                      {user.role}
                    </span>
                    {user.isLoggedIn && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
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
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>

                    {/* Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          name="firstName"
                          value={updateUser.firstName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          name="lastName"
                          value={updateUser.lastName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          name="email"
                          type="email"
                          value={updateUser.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          name="phoneNo"
                          value={updateUser.phoneNo}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Address</Label>
                        <Textarea
                          name="address"
                          value={updateUser.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          name="city"
                          value={updateUser.city}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Zip Code</Label>
                        <Input
                          name="zipCode"
                          value={updateUser.zipCode}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Profile Picture URL</Label>
                        <Input
                          type="file"
                          name="profilePic"
                          accept="image/*"
                          //   value={updateUser.profilePic}
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={updateUser.role}
                          onValueChange={(value) =>
                            setUpdateUser({ ...updateUser, role: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center gap-2"
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
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">First Name</span>
                <span className="font-medium">{user.firstName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Last Name</span>
                <span className="font-medium">{user.lastName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Verified</span>
                <span className="font-medium text-green-600">
                  {user.isVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-blue-600">
                  {user.isLoggedIn ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium">
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
