import { create } from "zustand";
import type { Announcement } from "../../../types";
import { announcementService } from "../services/AnnouncementService";

interface AnnouncementState {
  announcements: Announcement[];
  currentAnnouncement: Announcement | null;
  isLoading: boolean;
  error: string | null;

  currentPage: number;
  totalPages: number;
  totalAnnouncements: number;

  subscription: any;

  fetchAnnouncements: () => Promise<void>;
  fetchAnnouncementById: (id: string) => Promise<void>;
  createAnnouncement: (
    announcementData: Omit<Announcement, "id" | "created_at">,
    token: string
  ) => Promise<void>;
  updateAnnouncement: (
    id: string,
    announcementData: Partial<Omit<Announcement, "id" | "created_at">>,
    token: string
  ) => Promise<void>;
  deleteAnnouncement: (id: string, token: string) => Promise<void>;
  fetchAnnouncementsPaginated: (
    page: number,
    limit: number,
    token: string
  ) => Promise<void>;
  searchAnnouncements: (query: string) => Promise<void>;
  fetchAnnouncementsByCategory: (category: string) => Promise<void>;

  subscribeToAnnouncements: () => void;
  unsubscribeFromAnnouncements: () => void;

  clearError: () => void;
  clearCurrentAnnouncement: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set, get) => ({
  announcements: [],
  currentAnnouncement: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalAnnouncements: 0,
  subscription: null,

  fetchAnnouncements: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.getAnnouncements();

      if (response.success && response.data) {
        set({
          announcements: response.data,
          totalAnnouncements: response.data.length,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to fetch announcements");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
        isLoading: false,
      });
    }
  },

  fetchAnnouncementById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.getAnnouncementById(id);

      if (response.success && response.data) {
        set({
          currentAnnouncement: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to fetch announcement");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcement",
        isLoading: false,
      });
    }
  },

  createAnnouncement: async (
    announcementData: Omit<Announcement, "id" | "created_at">,
    token: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.createAnnouncement(
        announcementData,
        token
      );

      if (response.success && response.data) {
        const currentAnnouncements = get().announcements;
        set({
          announcements: [response.data, ...currentAnnouncements],
          totalAnnouncements: currentAnnouncements.length + 1,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to create announcement");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to create announcement",
        isLoading: false,
      });
      throw error;
    }
  },

  updateAnnouncement: async (
    id: string,
    announcementData: Partial<Omit<Announcement, "id" | "created_at">>,
    token: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.updateAnnouncement(
        id,
        announcementData,
        token
      );

      if (response.success && response.data) {
        const currentAnnouncements = get().announcements;
        const updatedAnnouncements = currentAnnouncements.map((announcement) =>
          announcement.id === id ? response.data! : announcement
        );

        set({
          announcements: updatedAnnouncements,
          currentAnnouncement: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to update announcement");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update announcement",
        isLoading: false,
      });
      throw error;
    }
  },

  deleteAnnouncement: async (id: string, token: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.deleteAnnouncement(id, token);

      if (response.success) {
        const currentAnnouncements = get().announcements;
        const filteredAnnouncements = currentAnnouncements.filter(
          (announcement) => announcement.id !== id
        );

        set({
          announcements: filteredAnnouncements,
          totalAnnouncements: filteredAnnouncements.length,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to delete announcement");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete announcement",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchAnnouncementsPaginated: async (
    page: number,
    limit: number,
    token: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.getAnnouncementsPaginated(
        page,
        limit,
        token
      );

      if (response.success && response.data) {
        set({
          announcements: response.data.announcements,
          currentPage: page,
          totalPages: response.data.totalPages,
          totalAnnouncements: response.data.total,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to fetch announcements");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
        isLoading: false,
      });
    }
  },

  searchAnnouncements: async (query: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.searchAnnouncements(query);

      if (response.success && response.data) {
        set({
          announcements: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to search announcements");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to search announcements",
        isLoading: false,
      });
    }
  },

  fetchAnnouncementsByCategory: async (category: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await announcementService.getAnnouncementsByCategory(
        category
      );

      if (response.success && response.data) {
        set({
          announcements: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.message || "Failed to fetch announcements");
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
        isLoading: false,
      });
    }
  },

  subscribeToAnnouncements: () => {
    const currentSubscription = get().subscription;
    if (currentSubscription) {
      announcementService.unsubscribeFromAnnouncements(currentSubscription);
    }

    const subscription = announcementService.subscribeToAnnouncements(
      (announcements) => {
        set({
          announcements,
          totalAnnouncements: announcements.length,
        });
      }
    );

    set({ subscription });
  },

  unsubscribeFromAnnouncements: () => {
    const subscription = get().subscription;
    if (subscription) {
      announcementService.unsubscribeFromAnnouncements(subscription);
      set({ subscription: null });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearCurrentAnnouncement: () => {
    set({ currentAnnouncement: null });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
