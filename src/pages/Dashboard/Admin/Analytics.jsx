import React, { useEffect, useState } from "react";
import api from "../../../services/api";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplications: 0,
    totalPayments: 0,
  });

  const loadStats = async () => {
    const res = await api.get("/admin/analytics");
    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Platform Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-primary text-white shadow">
          <h3 className="text-lg">Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="p-6 rounded-xl bg-secondary text-white shadow">
          <h3 className="text-lg">Scholarships</h3>
          <p className="text-3xl font-bold">{stats.totalScholarships}</p>
        </div>

        <div className="p-6 rounded-xl bg-purple-600 text-white shadow">
          <h3 className="text-lg">Applications</h3>
          <p className="text-3xl font-bold">{stats.totalApplications}</p>
        </div>

        <div className="p-6 rounded-xl bg-green-600 text-white shadow">
          <h3 className="text-lg">Payments</h3>
          <p className="text-3xl font-bold">₹{stats.totalPayments}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
