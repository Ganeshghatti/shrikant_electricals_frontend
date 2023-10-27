import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const employee = JSON.parse(localStorage.getItem("employee"));

  if (employee && employee.isauthenticated) {
    return <Navigate to="/user-not-found" />;
  }
  return children;
}
