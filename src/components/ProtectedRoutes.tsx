import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/AuthStore";
import type { User } from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<User["role"]>;
  redirectTo?: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#024334]"></div>
      <p className="mt-4 text-gray-600 font-poppins">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ["admin", "college_editor", "viewer"],
  redirectTo,
}) => {
  const { isAuthenticated, user, token, checkAuth } = useAuthStore();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token && !user) {
        try {
          await checkAuth();
        } catch (error) {
          console.error("Auth check failed:", error);
        }
      }
      setIsChecking(false);
    };

    verifyAuth();
  }, [token, user, checkAuth]);

  if (isChecking) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (!redirectTo) {
      if (user.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user.role === "college_editor") {
        return <Navigate to="/editor/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }

    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
