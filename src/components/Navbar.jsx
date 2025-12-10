import { useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import AuthContext from "../context/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { backendUser, logout } = useContext(AuthContext) || {};
  const role = backendUser?.role || null;

  // Determine dashboard route based on role
  const dashboardRoute =
    role === "Admin"
      ? "/dashboard"
      : role === "Moderator"
      ? "/dashboard"
      : "/dashboard";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Scholarships", path: "/all-scholarships" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You are successfully logged out.",
      timer: 1800,
      showConfirmButton: false,
    });
  };
  return (
    <nav className="w-full bg-white shadow-sm  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold flex items-center gap-1"
          >
            <span className="text-primary">Scholar</span>
            <span className="text-secondary">Stream</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-[16px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-700 hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* AUTH AREA */}
            {backendUser ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-1 rounded-md border hover:bg-gray-100 transition"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={
                      backendUser?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border cursor-pointer"
                  />
                  <span>{backendUser?.name?.split(" ")[0] || "User"}</span>

                  <FiChevronDown />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-48 py-2 z-50">
                    <Link
                      to={dashboardRoute}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-white bg-primary hover:bg-purple-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-primary border border-primary hover:bg-purple-50 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl text-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white w-full shadow-lg border-t animate-dropdown">
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="border-t pt-4 flex flex-col gap-3">
              {backendUser ? (
                <>
                  <Link
                    to={dashboardRoute}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-md bg-primary text-white text-center"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/my-profile"
                    className="px-3 py-2 rounded-md bg-primary  text-white text-center"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="px-3 py-2 rounded-md bg-red-500 text-white text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-white bg-primary text-center"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-primary border border-primary text-center"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
