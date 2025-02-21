import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbarMain/NavbarMain";
import { useWindowSize } from "@uidotdev/usehooks";

export default function CommonLayout() {
  const size = useWindowSize();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-500">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Layout */}
      <div className={`flex transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
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
    </>
  );
}
