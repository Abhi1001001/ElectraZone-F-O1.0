import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { ShoppingCart, Users, IndianRupee, Package } from "lucide-react";

// Dummy analytics data
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
];

const orderData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 200 },
  { month: "Mar", orders: 150 },
  { month: "Apr", orders: 300 },
  { month: "May", orders: 350 },
];

export default function AdminSales() {
  return (
    <div className="min-h-screen bg-black text-white pl-72 py-6 pr-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-red-500">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-900 border border-zinc-800">
          <CardContent className="p-5 flex items-center gap-4">
            <ShoppingCart className="text-red-500" />
            <div>
              <p className="text-sm text-zinc-400">Total Orders</p>
              <h2 className="text-xl font-semibold text-zinc-300">1,245</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border border-zinc-800">
          <CardContent className="p-5 flex items-center gap-4">
            <Users className="text-red-500" />
            <div>
              <p className="text-sm text-zinc-400">Customers</p>
              <h2 className="text-xl font-semibold text-zinc-300">845</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border border-zinc-800">
          <CardContent className="p-5 flex items-center gap-4">
            <IndianRupee className="text-red-500" />
            <div>
              <p className="text-sm text-zinc-400">Revenue</p>
              <h2 className="text-xl font-semibold text-zinc-300">₹2,45,000</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border border-zinc-800">
          <CardContent className="p-5 flex items-center gap-4">
            <Package className="text-red-500" />
            <div>
              <p className="text-sm text-zinc-400">Products</p>
              <h2 className="text-xl font-semibold text-zinc-300">10</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-zinc-900 border border-zinc-800">
          <CardHeader>
            <CardTitle className="text-red-500">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ef4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card className="bg-zinc-900 border border-zinc-800">
          <CardHeader>
            <CardTitle className="text-red-500">Orders Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="orders" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Section */}
      <Card className="bg-zinc-900 border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-red-500">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "iPhone 17 Pro Max", sales: 120 },
            { name: "boAt Rockerz 421", sales: 95 },
            { name: "HP Laptop Ryzen 5", sales: 80 },
          ].map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-zinc-800 pb-2"
            >
              <span className="text-zinc-400">{product.name}</span>
              <span className="text-red-500 font-medium">
                {product.sales} sold
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
