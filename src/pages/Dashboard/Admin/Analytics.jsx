// src/pages/Dashboard/DashboardHome.jsx
import React, { useContext, useEffect, useState } from "react";

import {
  Users,
  FileText,
  PieChart as PieIcon,
  Star,
  BarChart2,
} from "lucide-react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthProvider";

const COLORS = ["#7C3AED", "#EC4899", "#10B981", "#F97316", "#3B82F6"];

const Analytics = () => {
  const { backendUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [apps, setApps] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [payments, setPayments] = useState([]);

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {}
  };

  const loadScholarships = async () => {
    try {
      const { data } = await api.get("/scholarships");
      setScholarships(data?.total || []);
    } catch (error) {}
  };

  const loadAllApps = async () => {
    try {
      const res = await api.get("/applications");
      setApps(res.data || []);
    } catch (error) {}
  };

  const loadMyApps = async () => {
    try {
      const res = await api.get(`/applications/student/${backendUser.email}`);
      setMyApps(res.data || []);
    } catch (error) {}
  };

  const loadPayments = async () => {
    try {
      const { data } = await api.get(`/payments/student/${backendUser.email}`);
      setPayments(data || []);
    } catch (error) {}
  };

  const loadMyReviews = async () => {
    try {
      const { data } = await api.get("/my-reviews");
      setReviews(data || []);
    } catch (error) {
      //
    }
  };

  // LOAD DATA ----------------------------------------------
  useEffect(() => {
    loadUsers();
    loadScholarships();
    loadAllApps();
    loadMyApps();
    loadPayments();
    loadMyReviews();
  }, []);

  // SAMPLE CHART DATA ---------------------------------------
  const barChartData = [
    { name: "Users", value: users.length },
    { name: "Scholarships", value: scholarships.length },
    { name: "Applications", value: apps.length },
  ];

  const pieData = [
    {
      name: "Approved",
      value: apps.filter((a) => a.applicationStatus === "approved").length,
    },
    {
      name: "Pending",
      value: apps.filter((a) => a.applicationStatus === "pending").length,
    },
    {
      name: "Rejected",
      value: apps.filter((a) => a.applicationStatus === "rejected").length,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-purple-700">
          Analytics Dashboard
        </h1>
        <p className="text-gray-500">Welcome back, {backendUser?.name}</p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 border-l-4 border-purple-500">
          <Users className="text-purple-600" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h3 className="text-2xl font-bold">{users.length}</h3>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 border-l-4 border-pink-500">
          <FileText className="text-pink-600" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Scholarships</p>
            <h3 className="text-2xl font-bold">{scholarships}</h3>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 border-l-4 border-green-500">
          <PieIcon className="text-green-600" size={40} />
          <div>
            <p className="text-gray-500 text-sm">Applications</p>
            <h3 className="text-2xl font-bold">{apps.length}</h3>
          </div>
        </div>
      </div>

      {/* CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Platform Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Application Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
