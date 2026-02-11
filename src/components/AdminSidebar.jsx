import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Package, Users, ListOrdered } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard/sales",
    icon: LayoutDashboard,
  },
  {
    name: "Add Product",
    path: "/dashboard/add-product",
    icon: PlusCircle,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Orders",
    path: "/dashboard/orders",
    icon: ListOrdered,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-black border-r border-red-600/40 text-white fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-red-600/40">
        <h1 className="text-xl font-bold tracking-wide text-red-500">
          Admin Panel
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-red-500"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-red-600/40 text-xs text-zinc-500 text-center">
        © {new Date().getFullYear()} Admin
      </div>
    </aside>
  );
}
