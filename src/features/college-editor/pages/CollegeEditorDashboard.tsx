import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "../../auth/store/AuthStore";
import blazerLogo from "../../../assets/images/logo_only.png";

import EditorOverview from "../components/EditorOverview";
import ContactQueries from "../components/ContactQueries";

const EditorDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={blazerLogo} alt="Blazer Logo" className="h-8 w-auto" />
              <div>
                <h1 className="text-lg font-bold text-[#024334] font-libre-baskerville">
                  THE BLAZER
                </h1>
                <p className="text-xs text-gray-500 font-poppins">
                  Editor Panel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-[#024334] hover:text-[#08795F] font-poppins font-medium"
              >
                View Website
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#024334] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 font-poppins">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 font-poppins">
                    {user?.college}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Sign Out"
                >
                  <svg
                    className="w-5 h-5"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#024334] font-libre-baskerville mb-2">
            {user?.college} Dashboard
          </h2>
          <p className="text-gray-600 font-poppins">
            Manage contact queries and inquiries for your college
          </p>
        </div>

        <Routes>
          <Route index element={<Navigate to="/editor/overview" replace />} />
          <Route path="overview" element={<EditorOverview />} />
          <Route path="queries" element={<ContactQueries />} />
        </Routes>
      </main>
    </div>
  );
};

export default EditorDashboard;
