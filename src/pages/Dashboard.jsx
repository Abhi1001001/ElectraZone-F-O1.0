import AdminSidebar from "@/components/AdminSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center bg-black relative">
        <AdminSidebar />
        <div className="flex-1 m-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
