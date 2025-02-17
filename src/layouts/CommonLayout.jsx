import React from "react";


import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbarMain/NavbarMain";

export default function CommonLayout() {
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  const navbarLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-full ml-64">
        {/* Navbar */}
        <NavbarMain />

        {/* Page Content */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
