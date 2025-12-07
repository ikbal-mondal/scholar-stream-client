import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { Check, X, Eye } from "lucide-react";

const ModeratorManageApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    const res = await api.get("/applications");
    setApps(res.data);
  };

  const approve = async (id) => {
    await api.patch(`/applications/approve/${id}`);
    Swal.fire("Approved!", "Application approved.", "success");
    loadApps();
  };

  const reject = async (id) => {
    await api.patch(`/applications/reject/${id}`);
    Swal.fire("Rejected!", "Application rejected.", "info");
    loadApps();
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Scholarship</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {apps.map((app) => (
            <tr key={app._id}>
              <td className="p-3">{app.userName}</td>
              <td className="p-3">{app.scholarshipName}</td>

              <td className="p-3 capitalize">{app.applicationStatus}</td>

              <td className="p-3 flex gap-3">
                <button
                  className="text-green-600"
                  onClick={() => approve(app._id)}
                >
                  <Check />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => reject(app._id)}
                >
                  <X />
                </button>
                <button className="text-blue-600">
                  <Eye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorManageApplications;
