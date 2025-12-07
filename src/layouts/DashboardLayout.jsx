// src/layouts/DashboardLayout.jsx
import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Bookmark,
  Settings,
  Grid,
  Star,
  LogOut,
  Menu,
  X,
  Search,
  BarChart2,
  PlusSquare,
  CircleDollarSign,
} from "lucide-react";
import AuthContext from "../context/AuthProvider";

/**
 * Modern Wide Sidebar Layout (Option A)
 * - Wide left sidebar with section headings
 * - Rounded active indicator
 * - Upgrade box at bottom
 * - Responsive: mobile drawer
 * - Topbar with search + profile avatar
 */

const roleMenu = {
  Student: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
      end: true,
    },
    {
      name: "My Applications",
      path: "/dashboard/my-applications",
      icon: <FileText />,
    },
    {
      name: "My Payments",
      path: "/dashboard/my-payments",
      icon: <CircleDollarSign />,
    },
    { name: "My Reviews", path: "/dashboard/my-reviews", icon: <Star /> },
  ],
  Moderator: [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    {
      name: "Manage Applications",
      path: "/dashboard/moderator/manage-applications",
      icon: <FileText />,
    },
    {
      name: "Application Feedback",
      path: "/dashboard/moderator/feedback",
      icon: <Bookmark />,
    },
  ],
  Admin: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard />,
      end: true,
    },
    {
      name: "Manage Scholarships",
      path: "/dashboard/manage-scholarships",
      icon: <FileText />,
    },
    {
      name: "Add Scholarship",
      path: "/dashboard/add-scholarship",
      icon: <PlusSquare />,
    },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <Users /> },
    { name: "Analytics", path: "/dashboard/analytics", icon: <BarChart2 /> },
  ],
};

const DashboardLayout = () => {
  const { backendUser, logout } = useContext(AuthContext) || {};
  const role = backendUser?.role || "Student";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const userName = backendUser?.name || "Unnamed";
  const userFirst = userName.split(" ")[0];
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".avatar-dropdown")) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* ---------- SIDEBAR (wide) ---------- */}
      <aside className="hidden md:flex flex-col w-72 bg-purple-100 border-r-2 border-gray-300 shadow-2xl sticky top-0 h-screen">
        <div className="px-6 py-5 bg-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-extrabold">
              SS
            </div>
            <div>
              <div className="text-xl font-bold text-primary">Scholar</div>
              <div className="text-md font-semibold text-secondary">Stream</div>
            </div>
          </div>
        </div>

        <nav className="px-4 py-6 flex-1 overflow-auto">
          <div className="space-y-1">
            {(roleMenu[role] || roleMenu.Student).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end || false}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition relative ${
                    isActive
                      ? "bg-white text-primary font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="truncate">{item.name}</span>
                {/* active rounded indicator on left */}
                <span
                  className={`absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-8 rounded-r-full ${undefined}`}
                  aria-hidden
                />
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      {/* ---------- MOBILE SIDEBAR (drawer) ---------- */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* panel */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lg transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-6 py-5 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-extrabold">
                SS
              </div>
              <div>
                <div className="text-lg font-bold text-primary">Scholar</div>
                <div className="text-sm font-semibold text-secondary">
                  Stream
                </div>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="px-4 py-6">
            {(roleMenu[role] || roleMenu.Student).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            <div className="mt-6">
              <Link
                to="/dashboard/manage-users"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50"
              >
                <Users />
                Manage Users
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="flex-1 min-h-screen">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMobileOpen(true)}
              aria-label="open menu"
            >
              <Menu />
            </button>

            <div className="hidden lg:block text-2xl font-bold">
              <span className="text-primary">Scholar</span>{" "}
              <span className="text-secondary">Stream</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <div className="font-semibold">{userFirst}</div>
                <div className="text-xs">{backendUser?.email}</div>
              </div>
            </div>

            {/* ---------- PROFILE DROPDOWN ---------- */}
            <div className="relative avatar-dropdown">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={
                      backendUser?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute p-1 right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{backendUser?.name}</p>
                      <p className="text-xs text-gray-500">
                        {backendUser?.email}
                      </p>
                    </div>

                    <button
                      className="w-full rounded text-left px-4 py-2 hover:bg-red-200 text-sm text-red-600"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="p-6 lg:p-8">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
