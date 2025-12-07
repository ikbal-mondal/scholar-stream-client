import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Users, FileText, BarChart, Settings } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard/admin/manage-users"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <Users size={18} /> Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/manage-scholarships"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <FileText size={18} /> Manage Scholarships
          </NavLink>

          <NavLink
            to="/dashboard/admin/analytics"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <BarChart size={18} /> Analytics
          </NavLink>

          <NavLink
            to="/dashboard/admin/settings"
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-100"
          >
            <Settings size={18} /> Settings
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
