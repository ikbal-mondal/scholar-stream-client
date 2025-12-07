// src/pages/Dashboard/DashboardHome.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { Users, FileText, PieChart, Star } from "lucide-react";

/**
 * DashboardHome
 * - fetches small analytics summary (uses /analytics/summary if available)
 * - shows role-based stats and recent activities
 * - responsive and fits wide sidebar layout
 */

const DashboardHome = () => {
  const { backendUser } = useContext(AuthContext) || {};
  const [summary, setSummary] = useState({
    usersCount: "---",
    scholarshipsCount: "---",
    applicationsCount: "---",
    paidApplications: "---",
  });

  // try load server analytics (if API present)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/analytics/summary"); // ensure proxy or absolute URL in production
        if (!res.ok) throw new Error("no analytics");
        const data = await res.json();
        if (mounted) setSummary(data);
      } catch (err) {
        // ignore - keep placeholders
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const name = backendUser?.name?.split(" ")[0] || "User";
  const role = backendUser?.role || "Student";

  // Role-based small cards (if admin, show global summary)
  const cards =
    role === "Admin"
      ? [
          { title: "Total Users", value: summary.usersCount, icon: <Users /> },
          {
            title: "Scholarships",
            value: summary.scholarshipsCount,
            icon: <FileText />,
          },
          {
            title: "Paid Applications",
            value: summary.paidApplications,
            icon: <PieChart />,
          },
        ]
      : role === "Moderator"
      ? [
          { title: "Pending Applications", value: 18, icon: <FileText /> },
          { title: "Reviewed", value: 42, icon: <Star /> },
          { title: "Total Applications", value: 120, icon: <Users /> },
        ]
      : [
          { title: "My Applications", value: 3, icon: <FileText /> },
          { title: "Payments", value: 1, icon: <PieChart /> },
          { title: "My Reviews", value: 2, icon: <Star /> },
        ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-primary">{name}</span> 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Role: <span className="font-medium">{role}</span>
        </p>
      </header>

      {/* stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4"
          >
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              {c.icon}
            </div>
            <div>
              <div className="text-sm text-gray-500">{c.title}</div>
              <div className="text-2xl font-bold">{c.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
