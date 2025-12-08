"use client";

import { useEffect, useState } from "react";
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
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import api from "../../../services/api";

export default function AnalyticsPage() {
  const API = "https://scholar-stream-server-three.vercel.app";

  const [summary, setSummary] = useState({});
  const [revenue, setRevenue] = useState([]);
  const [byUniversity, setByUniversity] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  console.log(summary, revenue, byUniversity, byCategory);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await Promise.all([
      fetchSummary(),
      fetchRevenue(),
      fetchByUniversity(),
      fetchByCategory(),
    ]);
  }

  async function fetchSummary() {
    const res = await fetch(`${api}/analytics/summary`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSummary(await res.json());
  }

  async function fetchRevenue() {
    const res = await fetch(`${api}/analytics/revenue-monthly`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setRevenue(Array.isArray(data) ? data : []);
  }

  async function fetchByUniversity() {
    const res = await fetch(`${api}/analytics/applications-by-university`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setByUniversity(Array.isArray(data) ? data : []);
  }

  async function fetchByCategory() {
    const res = await fetch(`${api}/analytics/applications-by-category`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setByCategory(Array.isArray(data) ? data : []);
  }

  const colors = ["#FF6CAB", "#7366FF", "#36C2CE", "#FFA41B", "#4CAF50"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Platform Analytics</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Total Users" value={summary.usersCount} />
        <Card label="Total Scholarships" value={summary.scholarshipsCount} />
        <Card
          label="Total Paid Applications"
          value={summary.paidApplications}
        />
      </div>

      {/* REVENUE CHART */}
      <Section title="Monthly Revenue">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue}>
            <XAxis dataKey="_id.month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#36C2CE" />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* APPLICATIONS BY UNIVERSITY */}
      <Section title="Applications by University">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={byUniversity}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FF6CAB" />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* APPLICATIONS BY CATEGORY */}
      <Section title="Applications by Scholarship Category">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="count"
              nameKey="_id"
              outerRadius={120}
              label
            >
              {byCategory.map((d, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Section>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="p-6 bg-white shadow rounded-xl border">
      <p className="text-gray-500">{label}</p>
      <h2 className="text-4xl font-bold mt-2">{value ?? 0}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
