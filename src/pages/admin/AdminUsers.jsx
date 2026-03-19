import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Search, User, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  // const dispatch = useDispatch();

  // getting users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/users/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        console.log("product from product page", res.data.users);
        setUsers(res.data.users);
        // dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [users, search]);

  const handleDelete = (id) => {
    confirm("Are you sure you want to delete this user?") &&
    setUsers(users.filter((u) => u._id !== id));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

   if (loading)
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center">
        <Loader2 className="animate-spin text-red-600 h-10 w-10" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white pl-72 py-6 pr-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-500 mb-6">Users Management</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-zinc-900 border-zinc-700 focus:border-red-500"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            className="bg-zinc-900 border border-zinc-800 hover:border-red-600 transition rounded-xl"
          >
            <CardContent className="flex items-center justify-between p-5 gap-4">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  {user.profilePic === "" ? (
                    <User className="text-red-500" />
                  ) : (
                    <img src={user.profilePic} alt="profilePic" />
                  )}
                </div>

                <div>
                  <h2 className="font-medium text-zinc-300">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-zinc-400">{user.email}</p>

                  {/* Badges */}
                  <div className="flex gap-2 mt-1">
                    <Badge className="bg-red-600 text-white">{user.role}</Badge>

                    {user.isVerified && (
                      <Badge className="bg-green-600 text-white">
                        Verified
                      </Badge>
                    )}

                    <Badge
                      className={`${
                        user.isLoggedIn ? "bg-blue-600" : "bg-zinc-600"
                      } text-white`}
                    >
                      {user.isLoggedIn ? "Active" : "Offline"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
                  onClick={() => handleDelete(user._id)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
