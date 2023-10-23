import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const employee = JSON.parse(localStorage.getItem("employee"));

  if (!employee || !employee.isauthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}
