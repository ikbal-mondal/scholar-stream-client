import React, { useEffect, useState, useContext } from "react";
import {
  User,
  Shield,
  Trash2,
  Search,
  ChevronDown,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";

import Swal from "sweetalert2";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthProvider";

export default function AdminManageUsers() {
  const { backendUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  // ---------------------------------------
  // LOAD USERS
  // ---------------------------------------
  const loadUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data || []);
      setFiltered(data || []);
    } catch (error) {
      Swal.fire("Error", "Unable to fetch users", "error");
    }
  };

  // ---------------------------------------
  // FILTERING
  // ---------------------------------------
  useEffect(() => {
    let result = [...users];

    if (roleFilter !== "All") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (search.trim() !== "") {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [roleFilter, search, users]);

  // ---------------------------------------
  // UPDATE USER ROLE
  // ---------------------------------------
  const updateRole = async (user, newRole) => {
    const confirm = await Swal.fire({
      title: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.patch(`/users/${user._id}/role`, { role: newRole });
      Swal.fire("Updated", "Role updated successfully", "success");
      loadUsers();
    } catch (err) {
      Swal.fire("Error", "Unable to update role", "error");
    }
  };

  // ---------------------------------------
  // DELETE USER
  // ---------------------------------------
  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "This will delete user applications & reviews too!",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/users/${id}`);
      Swal.fire("Deleted", "User removed", "success");
      loadUsers();
    } catch (err) {
      Swal.fire("Error", "Unable to delete user", "error");
    }
  };

  // ---------------------------------------
  // UI
  // ---------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Users className="text-primary" /> Manage Users
      </h2>

      {/* FILTER + SEARCH */}
      <div className="flex items-center justify-between mb-6">
        {/* Search */}
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-72">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search user..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>All</option>
          <option>Student</option>
          <option>Moderator</option>
          <option>Admin</option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-x-auto rounded-xl border shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src={u.photoURL || "/default-user.png"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold">{u.name}</span>
                </td>

                <td className="p-3 text-gray-600">{u.email}</td>

                <td className="p-3 font-semibold">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                      ${
                        u.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : u.role === "Moderator"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  {/* Promote / Demote Buttons */}
                  {u.role !== "Admin" && (
                    <button
                      onClick={() => updateRole(u, "Admin")}
                      className="px-3 py-1 border rounded-lg text-purple-700 hover:bg-purple-50"
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role !== "Moderator" && (
                    <button
                      onClick={() => updateRole(u, "Moderator")}
                      className="px-3 py-1 border rounded-lg text-blue-700 hover:bg-blue-50"
                    >
                      Make Moderator
                    </button>
                  )}

                  {u.role !== "Student" && (
                    <button
                      onClick={() => updateRole(u, "Student")}
                      className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Make Student
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 border border-red-400 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
