// src/router/AppRouter.jsx
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";

// Public pages
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Dashboard pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import EditScholarship from "../pages/Dashboard/Admin/EditScholarship";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// Route guards
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ScholarshipDetails from "../pages/Scholarships/ScholarshipDetails";
import AllScholarships from "../pages/Scholarships/AllScholarships";
import ApplyForm from "../pages/Apply/ApplyForm";
import ApplicationSummary from "../pages/Apply/ApplicationSummary";
import PaymentPage from "../pages/Scholarships/PaymentPage";
import ApplicationSuccess from "../pages/Apply/ApplicationSuccess";
import Unauthorized from "../pages/Auth/Unauthorized";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyPayments from "../pages/Dashboard/Student/MyPayments";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import ApplicationFeedback from "../pages/Dashboard/Moderator/ApplicationFeedback";
import AllApplications from "../pages/Dashboard/Admin/AllApplications";
import NotFound from "../pages/Error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFound /> },

      // AUTH
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Scholarship public pages
      { path: "scholarship/:id", element: <ScholarshipDetails /> },
      { path: "all-scholarships", element: <AllScholarships /> },
      //   UNAUTHORIZED PAGE
      { path: "/unauthorized", element: <Unauthorized /> },
      // APPLY ROUTES — only logged in users
      {
        element: (
          <ProtectedRoute allowedRoles={["Student", "Moderator", "Admin"]} />
        ),
        children: [
          { path: "apply/:id", element: <ApplyForm /> },
          { path: "apply-summary/:id", element: <ApplicationSummary /> },
          { path: "payment/:id", element: <PaymentPage /> },
          { path: "application-success", element: <ApplicationSuccess /> },
        ],
      },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Student", "Moderator", "Admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "edit-scholarship/:id",
        element: (
          <AdminRoute>
            <EditScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },
      {
        path: "all-applications",
        element: (
          <AdminRoute>
            <AllApplications></AllApplications>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-applications",
        element: <MyApplications />,
      },
      {
        path: "/dashboard/my-payments",
        element: <MyPayments />,
      },

      {
        path: "/dashboard/my-reviews",
        element: <MyReviews />,
      },
      {
        path: "/dashboard/moderator/manage-applications",
        element: <ManageApplications></ManageApplications>,
      },

      {
        path: "/dashboard/moderator/feedback",
        element: <ApplicationFeedback></ApplicationFeedback>,
      },
    ],
  },
]);

export default router;
