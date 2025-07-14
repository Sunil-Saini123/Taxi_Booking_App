// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Get token based on role
  const token =
    requiredRole === "captain"
      ? localStorage.getItem("captaintoken")
      : localStorage.getItem("usertoken");


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
