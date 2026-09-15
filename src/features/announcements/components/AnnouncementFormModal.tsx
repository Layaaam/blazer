import React, { useState, useEffect } from "react";
import { useAnnouncementStore } from "../store/AnnouncementStore";
import { useAuthStore } from "../../auth/store/AuthStore";
import type { Announcement } from "../../../types";

interface AnnouncementFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
}

interface AnnouncementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAnnouncement?: Announcement | null;
}

export default function AnnouncementFormModal({
  isOpen,
  onClose,
  editingAnnouncement,
}: AnnouncementFormModalProps) {
  const { user, token } = useAuthStore();
  const { createAnnouncement, updateAnnouncement, error, clearError } =
    useAnnouncementStore();

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const categories = [
    "Theme",
    "Schedule",
    "Guidelines",
    "Sales",
    "Event",
    "General",
  ];

  useEffect(() => {
    if (editingAnnouncement) {
      setFormData({
        title: editingAnnouncement.title,
        content: editingAnnouncement.content,
        excerpt: editingAnnouncement.excerpt,
        category: editingAnnouncement.category,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
      });
    }
  }, [editingAnnouncement, isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
    });
    setLocalError(null);
    clearError();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      setLocalError("Authentication required");
      return;
    }

    if (!formData.title.trim()) {
      setLocalError("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      setLocalError("Content is required");
      return;
    }
    if (!formData.excerpt.trim()) {
      setLocalError("Excerpt is required");
      return;
    }
    if (!formData.category) {
      setLocalError("Category is required");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);

    try {
      const announcementData = {
        ...formData,
        author_id: user.id,
        author_name: user.name,
        read_time: `${Math.ceil(formData.content.length / 200)} min read`,
      };

      if (editingAnnouncement) {
        await updateAnnouncement(
          editingAnnouncement.id,
          announcementData,
          token
        );
      } else {
        await createAnnouncement(announcementData, token);
      }

      handleClose();
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Failed to save announcement"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title.trim() &&
    formData.content.trim() &&
    formData.excerpt.trim() &&
    formData.category;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-[#024334] to-[#08795F] px-6 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold font-libre-baskerville">
                  {editingAnnouncement
                    ? "Edit Announcement"
                    : "Create New Announcement"}
                </h2>
                <p className="text-white/90 font-poppins mt-1">
                  {editingAnnouncement
                    ? "Update your announcement details below"
                    : "Share important information with the community"}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 group"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 transition-transform group-hover:scale-110"
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
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {(error || localError) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z" />
                </svg>
                <div>
                  <p className="font-semibold font-poppins">Error</p>
                  <p className="text-sm">{error || localError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    clearError();
                    setLocalError(null);
                  }}
                  className="ml-auto text-red-600 hover:text-red-800"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2 font-poppins"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334] font-poppins"
                    placeholder="Enter announcement title"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2 font-poppins"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334] font-poppins"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700 mb-2 font-poppins"
                  >
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334] font-poppins resize-vertical"
                    placeholder="Brief summary of the announcement"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1 font-poppins">
                    {formData.excerpt.length}/200 characters
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 mb-2 font-poppins"
                  >
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024334]/20 focus:border-[#024334] font-poppins resize-vertical"
                    placeholder="Full announcement content"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1 font-poppins">
                    Estimated read time:{" "}
                    {Math.ceil(formData.content.length / 200)} min
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-poppins font-semibold transition-colors duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="px-8 py-3 bg-[#024334] hover:bg-[#08795F] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-poppins font-semibold transition-colors duration-200 flex items-center gap-2 min-w-[140px] justify-center"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {isSubmitting
                  ? "Saving..."
                  : editingAnnouncement
                  ? "Update Announcement"
                  : "Create Announcement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
