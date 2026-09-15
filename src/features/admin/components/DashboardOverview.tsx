import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnnouncementStore } from "../../announcements/store/AnnouncementStore";

const DashboardOverview: React.FC = () => {
  const { announcements, fetchAnnouncements, isLoading } =
    useAnnouncementStore();

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const totalAnnouncements = announcements.length;
  const thisWeekAnnouncements = announcements.filter((a) => {
    const announcementDate = new Date(a.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return announcementDate >= oneWeekAgo;
  }).length;

  const stats = [
    {
      name: "Total Announcements",
      value: totalAnnouncements.toString(),
      change:
        thisWeekAnnouncements > 0
          ? `+${thisWeekAnnouncements} this week`
          : "No new this week",
      changeType: thisWeekAnnouncements > 0 ? "positive" : "neutral",
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
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
    {
      name: "Emails Sent",
      value: "2,847",
      change: "+12% from last month",
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },

    {
      name: "Active Users",
      value: "89",
      change: "+3 new this month",
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
  ];

  const recentAnnouncements = announcements.slice(0, 3).map((announcement) => ({
    id: parseInt(announcement.id),
    title: announcement.title,
    date: announcement.created_at,
    status: "published",
    emailsSent: Math.floor(Math.random() * 1000) + 2000,
  }));

  const quickActions = [
    {
      name: "Create Announcement",
      description: "Post a new announcement to all users",
      href: "/admin/announcements",
      icon: (
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      color: "bg-[#024334] hover:bg-[#08795F]",
    },
    {
      name: "Check Email Status",
      description: "View email delivery reports",
      href: "/admin/email-tracking",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Manage Users",
      description: "Add or edit user accounts",
      href: "/admin/users",
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#024334]/10 rounded-xl flex items-center justify-center text-[#024334]">
                    {isLoading && index === 0 ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#024334]"></div>
                    ) : (
                      stat.icon
                    )}
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
        <h3 className="text-xl font-bold text-gray-900 mb-6 font-libre-baskerville">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group relative bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white transition-colors duration-200`}
                >
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-[#024334] transition-colors duration-200 font-poppins">
                    {action.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 font-poppins">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 font-libre-baskerville">
            Recent Announcements
          </h3>
          <Link
            to="/admin/announcements"
            className="text-[#024334] hover:text-[#08795F] font-medium text-sm font-poppins transition-colors duration-200"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#024334]"></div>
            <p className="mt-2 text-gray-600 font-poppins">
              Loading announcements...
            </p>
          </div>
        ) : recentAnnouncements.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900 font-poppins">
              No announcements yet
            </h3>
            <p className="mt-1 text-sm text-gray-500 font-poppins">
              Get started by creating your first announcement.
            </p>
            <Link
              to="/admin/announcements"
              className="mt-4 inline-flex items-center px-4 py-2 bg-[#024334] hover:bg-[#08795F] text-white rounded-lg font-poppins font-semibold transition-colors duration-200"
            >
              Create Announcement
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 font-poppins">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 font-poppins">
                    Published on {formatDate(announcement.date)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {announcement.emailsSent.toLocaleString()} sent
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2 font-poppins">
                    {announcement.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
