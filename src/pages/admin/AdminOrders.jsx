import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Dummy Orders (replace with API)
const dummyOrders = [
  {
    _id: "1",
    user: "Abhishek",
    email: "abhishek@gmail.com",
    total: 45999,
    paymentStatus: "Paid",
    orderStatus: "Pending",
  },
  {
    _id: "2",
    user: "Rahul",
    email: "rahul@gmail.com",
    total: 1299,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
  },
  {
    _id: "3",
    user: "Aman",
    email: "aman@gmail.com",
    total: 999,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [search, setSearch] = useState("");

  // Filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      `${order.user} ${order.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [orders, search]);

  // Update Order Status
  const handleStatusChange = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, orderStatus: status } : order,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pl-72 py-6 pr-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-500 mb-6">Order Monitoring</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-zinc-900 border-zinc-700 focus:border-red-500"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card
            key={order._id}
            className="bg-zinc-900 border border-zinc-800 hover:border-red-600 transition rounded-xl"
          >
            <CardContent className="p-5 flex flex-col md:flex-row justify-between gap-4">
              {/* Left Info */}
              <div>
                <h2 className="font-semibold text-lg text-zinc-300">{order.user}</h2>
                <p className="text-sm text-zinc-400">{order.email}</p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  {/* Payment */}
                  <Badge
                    className={`${
                      order.paymentStatus === "Paid"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    } text-white`}
                  >
                    {order.paymentStatus}
                  </Badge>

                  {/* Order Status */}
                  <Badge className="bg-blue-600 text-white">
                    {order.orderStatus}
                  </Badge>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col md:items-end gap-3">
                <p className="text-lg font-semibold text-red-500">
                  ₹{order.total.toLocaleString()}
                </p>

                {/* Status Update */}
                <Select
                  onValueChange={(value) =>
                    handleStatusChange(order._id, value)
                  }
                >
                  <SelectTrigger className="w-40 bg-zinc-900 border-zinc-700 focus:border-red-500 text-zinc-300">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>

                  <SelectContent className="bg-black text-white border-zinc-700">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
