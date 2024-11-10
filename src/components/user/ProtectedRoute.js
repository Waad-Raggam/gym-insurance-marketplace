import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isUserDataLoading, isAuthenticated, isAdmin, requiresAdmin, element }) {
  if (isUserDataLoading) return <div>Loading...</div>;

  if (requiresAdmin) {
    return isAuthenticated && isAdmin ? element : <Navigate to="/login" />;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
}
