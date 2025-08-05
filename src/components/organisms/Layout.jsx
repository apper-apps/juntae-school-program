import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  // If not authenticated, this should not render as routing handles auth
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-slate-900 to-surface-900">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;