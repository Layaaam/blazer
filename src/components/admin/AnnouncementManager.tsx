import React, { useState, useEffect } from "react";
import { useAnnouncementStore } from "../../store/AnnouncementStore";
import { useAuthStore } from "../../store/AuthStore";
import AnnouncementFormModal from "./AnnouncementFormModal";
import type { Announcement } from "../../types";

const AnnouncementManager: React.FC = () => {
  const { user, token } = useAuthStore();
  const {
    announcements,
    isLoading,
    error,
    fetchAnnouncements,
    deleteAnnouncement,
    clearError,
  } = useAnnouncementStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleCreateNew = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnnouncement(null);
  };

  const handleDelete = async (announcement: Announcement) => {
    if (!token) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${announcement.title}"?\n\nThis action cannot be undone.`
      )
    ) {
      try {
        await deleteAnnouncement(announcement.id, token);
      } catch (error) {
        console.error("Failed to delete announcement:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-libre-baskerville">
                Announcement Manager
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-poppins">
                Create and manage announcements for the website
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-[#024334] hover:bg-[#08795F] text-white px-6 py-3 rounded-xl font-poppins font-semibold transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Announcement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-[#024334] to-[#08795F] rounded-xl p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
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
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90 font-poppins">
                    Total Announcements
                  </p>
                  <p className="text-2xl font-bold font-libre-baskerville">
                    {announcements.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90 font-poppins">
                    Published
                  </p>
                  <p className="text-2xl font-bold font-libre-baskerville">
                    {announcements.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90 font-poppins">
                    This Month
                  </p>
                  <p className="text-2xl font-bold font-libre-baskerville">
                    {
                      announcements.filter((a) => {
                        const announcementDate = new Date(a.created_at);
                        const now = new Date();
                        return (
                          announcementDate.getMonth() === now.getMonth() &&
                          announcementDate.getFullYear() === now.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-gray-900 font-libre-baskerville">
              All Announcements ({announcements.length})
            </h4>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334] text-sm font-poppins"
                />
                <svg
                  className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold font-poppins">
                  Error Loading Announcements
                </p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#024334]"></div>
              <p className="mt-2 text-gray-600 font-poppins">
                Loading announcements...
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 font-libre-baskerville mb-2">
                No announcements yet
              </h3>
              <p className="text-gray-500 font-poppins mb-6">
                Get started by creating your first announcement to share with
                the community.
              </p>
              <button
                onClick={handleCreateNew}
                className="bg-[#024334] hover:bg-[#08795F] text-white px-6 py-3 rounded-xl font-poppins font-semibold transition-colors duration-200 inline-flex items-center gap-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Your First Announcement
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-[#024334]/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#024334]/10 text-[#024334]">
                          {announcement.category}
                        </span>
                        <span className="text-sm text-gray-500 font-poppins">
                          {formatDate(announcement.created_at)}
                        </span>
                      </div>

                      <h5 className="text-xl font-semibold text-gray-900 mb-3 font-libre-baskerville">
                        {announcement.title}
                      </h5>

                      <p className="text-gray-600 text-sm font-poppins line-clamp-2 mb-3">
                        {announcement.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#024334]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#024334] text-xs font-semibold">
                              {announcement.author_name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-poppins">
                            By {announcement.author_name}
                          </span>
                        </div>
                        <span className="font-poppins">
                          {announcement.read_time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-6">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="p-2 text-gray-600 hover:text-[#024334] hover:bg-[#024334]/5 rounded-lg transition-colors duration-200"
                        title="Edit announcement"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(announcement)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete announcement"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnnouncementFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingAnnouncement={editingAnnouncement}
      />
    </>
  );
};

export default AnnouncementManager;
