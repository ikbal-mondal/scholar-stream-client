import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data.users);
  };

  const updateRole = async (id, role) => {
    await api.patch(`/admin/update-role/${id}`, { role });
    Swal.fire("Updated", `Role updated to ${role}`, "success");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge">{u.role}</span>
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => updateRole(u._id, "Admin")}
                  >
                    Make Admin
                  </button>

                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => updateRole(u._id, "Moderator")}
                  >
                    Make Moderator
                  </button>

                  <button
                    className="btn btn-xs btn-error text-white"
                    onClick={() => updateRole(u._id, "Student")}
                  >
                    Reset Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
