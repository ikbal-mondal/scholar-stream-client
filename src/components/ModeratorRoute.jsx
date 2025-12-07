import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ModeratorRoute = ({ children }) => {
  const { backendUser, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (
    !backendUser ||
    (backendUser.role !== "Moderator" && backendUser.role !== "Admin")
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ModeratorRoute;
