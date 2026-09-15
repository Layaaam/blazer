import React from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../auth/store/AuthStore";
import blazerLogo from "../../../assets/images/logo_only.png";

import DashboardOverview from "../components/DashboardOverview";
import AnnouncementManager from "../../announcements/components/AnnouncementManager";
import EmailTracker from "../components/EmailTracker";
import UserManager from "../components/UserManager";

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "home" },
    { name: "Announcements", href: "/admin/announcements", icon: "megaphone" },
    { name: "Email Tracking", href: "/admin/email-tracking", icon: "mail" },
    { name: "Users", href: "/admin/users", icon: "users" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return (
        location.pathname === "/admin" ||
        location.pathname === "/admin/dashboard"
      );
    }
    return location.pathname.startsWith(href);
  };

  const getIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case "home":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "megaphone":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        );
      case "mail":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
          <img src={blazerLogo} alt="Blazer Logo" className="h-13 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-[#024334] font-libre-baskerville">
              THE BLAZER
            </h1>
            <p className="text-xs text-gray-500 font-poppins">Admin Panel</p>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-[#024334] text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#024334]"
                  }`}
                >
                  {getIcon(item.icon)}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#024334] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate font-poppins">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate font-poppins">
                {user?.role.replace("_", " ")}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-poppins"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      <div className="ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-libre-baskerville">
                  {navigation.find((item) => isActive(item.href))?.name ||
                    "Dashboard"}
                </h2>
                <p className="text-sm text-gray-500 font-poppins">
                  Welcome back, {user?.name}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="text-sm text-[#024334] hover:text-[#08795F] font-poppins font-medium"
                >
                  View Website
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="announcements" element={<AnnouncementManager />} />
            <Route path="email-tracking" element={<EmailTracker />} />
            <Route path="users" element={<UserManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
