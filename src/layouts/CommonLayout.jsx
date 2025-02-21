import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbarMain/NavbarMain";
import { useWindowSize } from "@uidotdev/usehooks";

export default function CommonLayout() {
  const size = useWindowSize();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar size={size} />

      {/* Main Content */}
      <div
        className={`flex flex-col ${
          size?.width < 640 ? "w-full" : "ml-64 w-[calc(100%-16rem)]"
        }`}
      >
        {/* Navbar */}
        <NavbarMain size={size} />

        {/* Page Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
