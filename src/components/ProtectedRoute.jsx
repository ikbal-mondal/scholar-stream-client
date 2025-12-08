import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { backendUser, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center py-10">Checking login...</p>;

  if (!backendUser) return <Navigate to="/login" replace />;

  const role =
    backendUser.role.charAt(0).toUpperCase() +
    backendUser.role.slice(1).toLowerCase();

  if (!allowedRoles?.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
