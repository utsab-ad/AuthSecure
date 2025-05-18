import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
      <main className="w-full-screen">
 <Outlet />
      </main>
  );
};

export default Layout;
