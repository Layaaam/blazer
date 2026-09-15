// src/components/editor/EditorOverview.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../auth/store/AuthStore";

const EditorOverview: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      name: "Pending Queries",
      value: "7",
      change: "+2 today",
      changeType: "neutral",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Resolved This Week",
      value: "23",
      change: "+5 from last week",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Average Response Time",
      value: "2.3 hrs",
      change: "Improved from 3.1 hrs",
      changeType: "positive",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const recentQueries = [
    {
      id: 1,
      subject: "Course enrollment question",
      sender: "student@cmu.edu.ph",
      type: "Academic Question",
      date: "2025-07-20",
      status: "pending",
    },
    {
      id: 2,
      subject: "Internship requirements",
      sender: "intern.seeker@email.com",
      type: "Academic Question",
      date: "2025-07-19",
      status: "pending",
    },
    {
      id: 3,
      subject: "Scholarship application",
      sender: "scholar@email.com",
      type: "Student Services",
      date: "2025-07-19",
      status: "resolved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#024334] to-[#08795F] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 font-libre-baskerville">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-white/90 font-poppins">
          You're managing queries for {user?.college}. Here's what's happening
          today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#024334]/10 rounded-xl flex items-center justify-center text-[#024334]">
                    {stat.icon}
                  </div>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate font-poppins">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-bold text-gray-900 font-libre-baskerville">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span
                    className={`font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                    } font-poppins`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 font-libre-baskerville">
          Quick Action
        </h3>
        <Link
          to="/editor/queries"
          className="group flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <div className="w-12 h-12 bg-[#024334] hover:bg-[#08795F] rounded-xl flex items-center justify-center text-white transition-colors duration-200">
            <svg
              className="w-6 h-6"
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
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#024334] transition-colors duration-200 font-poppins">
              View All Queries
            </h4>
            <p className="text-sm text-gray-600 mt-1 font-poppins">
              Manage and respond to contact queries from students
            </p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-[#024334] transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 font-libre-baskerville">
            Recent Queries
          </h3>
          <Link
            to="/editor/queries"
            className="text-[#024334] hover:text-[#08795F] font-medium text-sm font-poppins transition-colors duration-200"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {recentQueries.map((query) => (
            <div
              key={query.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 font-poppins">
                  {query.subject}
                </h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 font-poppins">
                  <span>From: {query.sender}</span>
                  <span>•</span>
                  <span>{query.type}</span>
                  <span>•</span>
                  <span>{new Date(query.date).toLocaleDateString()}</span>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  query.status
                )} font-poppins`}
              >
                {query.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorOverview;
