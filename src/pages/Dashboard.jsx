import AdminSidebar from "@/components/AdminSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="flex bg-black">
        <AdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
