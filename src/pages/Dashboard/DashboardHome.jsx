// src/pages/Dashboard/DashboardHome.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import {
  Users,
  FileText,
  PieChart,
  Star,
  MessageCircleMoreIcon,
} from "lucide-react";
import api from "../../services/api";

const DashboardHome = () => {
  const { backendUser } = useContext(AuthContext) || {};
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [apps, setApps] = useState([]);
  const [application, setApplication] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
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
    } catch (error) {
      //  ''
    }
  };

  // ------------------ LOAD SCHOLARSHIPS ------------------
  const loadScholarships = async () => {
    try {
      setLoading(true);

      const res = await api.get("/scholarships");

      setData(res.data.total || []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadApps = async () => {
    try {
      setLoading(true);
      const res = await api.get("/applications", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setApps(res.data || []);
    } catch (err) {
      console.error("Error loading applications:", err);
    } finally {
      setLoading(false);
    }
  };

  // load application by user emil

  const loadApplicationByStudentEmail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/student/${backendUser.email}`);
      setApplication(res.data || []);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  // load student payment

  const loadPayments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/payments/student/${backendUser.email}`);
      setPayments(data || []);
    } catch (err) {
      console.error("Error loading payments:", err);
    } finally {
      setLoading(false);
    }
  };

  // student review load
  const loadMyReviews = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/my-reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setReviews(data || []);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  };

  // get all inquiries

  const loadInquiries = async () => {
    const res = await api.get("/contact");
    setInquiries(res.data || []);
  };

  useEffect(() => {
    loadApplicationByStudentEmail();
    loadScholarships();
    loadInquiries();
    loadApps();
    loadPayments();
    loadMyReviews();
  }, []);
  // console.log(data);

  const name = backendUser?.name || "User";
  const role = backendUser?.role || "Student";

  // Role-based small cards (if admin, show global summary)
  const cards =
    role === "Admin"
      ? [
          {
            title: "Total Users",
            value: users?.length,
            icon: <Users />,
          },
          {
            title: "Scholarships",
            value: data,
            icon: <FileText />,
          },
          {
            title: " Total Applications",
            value: apps?.length,
            icon: <PieChart />,
          },
          {
            title: " Total Inquiries",
            value: inquiries?.length,
            icon: <MessageCircleMoreIcon></MessageCircleMoreIcon>,
          },
        ]
      : role === "Moderator"
      ? [
          {
            title: " Total Inquiries",
            value: inquiries?.length,
            icon: <MessageCircleMoreIcon></MessageCircleMoreIcon>,
          },
          { title: "Total Applications", value: apps?.length, icon: <Users /> },
        ]
      : [
          {
            title: "My Applications",
            value: application?.length,
            icon: <FileText />,
          },
          { title: "Payments", value: payments?.length, icon: <PieChart /> },
          { title: "My Reviews", value: reviews?.length, icon: <Star /> },
        ];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-primary">{name}</span> 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-primary badge ">
            <span className="text-secondary">Role: </span>
            {role}
          </span>
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
