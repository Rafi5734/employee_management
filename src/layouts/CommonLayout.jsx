import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbarMain/NavbarMain";

export default function CommonLayout() {
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
