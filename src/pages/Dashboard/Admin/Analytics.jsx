"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [monthlyApps, setMonthlyApps] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topScholarships, setTopScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage?.getItem("token") : "";

  useEffect(() => {
    loadAllData();

    const interval = setInterval(() => {
      loadAllData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadAllData() {
    setLoading(true);
    await Promise.all([
      fetchSummary(),
      fetchMonthlyApplications(),
      fetchMonthlyRevenue(),
      fetchTopScholarships(),
    ]);
    setLoading(false);
  }

  async function fetchSummary() {
    const res = await fetch(
      `${"https://scholar-stream-server-three.vercel.app"}/analytics/summary`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSummary(await res.json());
  }

  async function fetchMonthlyApplications() {
    const res = await fetch(
      `${"https://scholar-stream-server-three.vercel.app"}/analytics/applications-monthly`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMonthlyApps(await res.json());
  }

  async function fetchMonthlyRevenue() {
    const res = await fetch(
      `${"https://scholar-stream-server-three.vercel.app"}/analytics/revenue-monthly`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMonthlyRevenue(await res.json());
  }

  async function fetchTopScholarships() {
    const res = await fetch(
      `${"https://scholar-stream-server-three.vercel.app"}/analytics/top-scholarships`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTopScholarships(await res.json());
  }

  const colors = ["#FF6CAB", "#7366FF", "#36C2CE", "#FFA41B", "#4CAF50"];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">
        📊 Platform Analytics
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <SummaryCard
          title="Users"
          value={summary?.usersCount}
          gradient="from-purple-500 to-purple-700"
        />
        <SummaryCard
          title="Scholarships"
          value={summary?.scholarshipsCount}
          gradient="from-pink-500 to-pink-700"
        />
        <SummaryCard
          title="Applications"
          value={summary?.applicationsCount}
          gradient="from-blue-500 to-blue-700"
        />
        <SummaryCard
          title="Paid Applications"
          value={summary?.paidApplications}
          gradient="from-green-500 to-green-700"
        />
      </div>

      {/* LINE CHART – MONTHLY APPLICATIONS */}
      <ChartSection title="Monthly Applications Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyApps}>
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#FF6CAB"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartSection>

      {/* BAR CHART – MONTHLY REVENUE */}
      <ChartSection title="Monthly Revenue">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#36C2CE" />
          </BarChart>
        </ResponsiveContainer>
      </ChartSection>

      {/* PIE CHART – TOP SCHOLARSHIPS */}
      <ChartSection title="Top Applied Scholarships">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topScholarships}
              dataKey="totalApplications"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {topScholarships?.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartSection>
    </div>
  );
}

function SummaryCard({ title, value, gradient }) {
  return (
    <div
      className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br ${gradient}`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <h3 className="text-4xl font-bold mt-1">{value ?? 0}</h3>
    </div>
  );
}

function ChartSection({ title, children }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow border">
      <h3 className="text-xl font-semibold mb-3 text-gray-700">{title}</h3>
      {children}
    </div>
  );
}
