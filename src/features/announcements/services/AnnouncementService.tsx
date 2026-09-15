import { supabase } from "../../../lib/supabase";
import type { Announcement, ApiResponse } from "../../../types";

class AnnouncementService {
  async getAnnouncements(): Promise<ApiResponse<Announcement[]>> {
    try {
      const { data: announcements, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }
      const transformedAnnouncements: Announcement[] = announcements.map(
        (announcement) => ({
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          excerpt: announcement.excerpt,
          category: announcement.category,
          author_id: announcement.author_id,
          author_name: announcement.author_name,
          created_at: announcement.created_at,
          read_time: announcement.read_time,
        })
      );

      return {
        success: true,
        data: transformedAnnouncements,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
      };
    }
  }

  async getAnnouncementById(id: string): Promise<ApiResponse<Announcement>> {
    try {
      const { data: announcement, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return {
          success: false,
          message:
            error.code === "PGRST116"
              ? "Announcement not found"
              : error.message,
        };
      }

      const transformedAnnouncement: Announcement = {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        excerpt: announcement.excerpt,
        category: announcement.category,
        author_id: announcement.author_id,
        author_name: announcement.author_name,
        created_at: announcement.created_at,
        read_time: announcement.read_time,
      };

      return {
        success: true,
        data: transformedAnnouncement,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcement",
      };
    }
  }

  async createAnnouncement(
    announcementData: Omit<Announcement, "id" | "created_at">,
    _token: string
  ): Promise<ApiResponse<Announcement>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        return {
          success: false,
          message: "Admin access required",
        };
      }

      const { data: announcement, error } = await supabase
        .from("announcements")
        .insert({
          title: announcementData.title,
          content: announcementData.content,
          excerpt: announcementData.excerpt,
          category: announcementData.category,
          author_id: announcementData.author_id,
          author_name: announcementData.author_name,
          read_time: announcementData.read_time,
        })
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const transformedAnnouncement: Announcement = {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        excerpt: announcement.excerpt,
        category: announcement.category,
        author_id: announcement.author_id,
        author_name: announcement.author_name,
        created_at: announcement.created_at,
        read_time: announcement.read_time,
      };

      return {
        success: true,
        data: transformedAnnouncement,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create announcement",
      };
    }
  }

  async updateAnnouncement(
    id: string,
    announcementData: Partial<Omit<Announcement, "id" | "created_at">>,
    _token: string
  ): Promise<ApiResponse<Announcement>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        return {
          success: false,
          message: "Admin access required",
        };
      }

      const updateData: any = {};
      if (announcementData.title) updateData.title = announcementData.title;
      if (announcementData.content)
        updateData.content = announcementData.content;
      if (announcementData.excerpt)
        updateData.excerpt = announcementData.excerpt;
      if (announcementData.category)
        updateData.category = announcementData.category;
      if (announcementData.read_time)
        updateData.read_time = announcementData.read_time;

      const { data: announcement, error } = await supabase
        .from("announcements")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message:
            error.code === "PGRST116"
              ? "Announcement not found"
              : error.message,
        };
      }

      const transformedAnnouncement: Announcement = {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        excerpt: announcement.excerpt,
        category: announcement.category,
        author_id: announcement.author_id,
        author_name: announcement.author_name,
        created_at: announcement.created_at,
        read_time: announcement.read_time,
      };

      return {
        success: true,
        data: transformedAnnouncement,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update announcement",
      };
    }
  }
  async deleteAnnouncement(
    id: string,
    _token: string
  ): Promise<ApiResponse<null>> {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        return {
          success: false,
          message: "Admin access required",
        };
      }

      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete announcement",
      };
    }
  }

  async getAnnouncementsPaginated(
    page: number = 1,
    limit: number = 10,
    _token: string
  ): Promise<
    ApiResponse<{
      announcements: Announcement[];
      total: number;
      totalPages: number;
    }>
  > {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return {
          success: false,
          message: "Authentication required",
        };
      }

      const offset = (page - 1) * limit;

      const { count, error: countError } = await supabase
        .from("announcements")
        .select("*", { count: "exact", head: true });

      if (countError) {
        return {
          success: false,
          message: countError.message,
        };
      }

      const { data: announcements, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const transformedAnnouncements: Announcement[] = announcements.map(
        (announcement) => ({
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          excerpt: announcement.excerpt,
          category: announcement.category,
          author_id: announcement.author_id,
          author_name: announcement.author_name,
          created_at: announcement.created_at,
          read_time: announcement.read_time,
        })
      );

      const total = count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          announcements: transformedAnnouncements,
          total,
          totalPages,
        },
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
      };
    }
  }

  async getAnnouncementsByCategory(
    category: string
  ): Promise<ApiResponse<Announcement[]>> {
    try {
      const { data: announcements, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const transformedAnnouncements: Announcement[] = announcements.map(
        (announcement) => ({
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          excerpt: announcement.excerpt,
          category: announcement.category,
          author_id: announcement.author_id,
          author_name: announcement.author_name,
          created_at: announcement.created_at,
          read_time: announcement.read_time,
        })
      );

      return {
        success: true,
        data: transformedAnnouncements,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch announcements",
      };
    }
  }

  async searchAnnouncements(
    query: string
  ): Promise<ApiResponse<Announcement[]>> {
    try {
      const { data: announcements, error } = await supabase
        .from("announcements")
        .select("*")
        .or(
          `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
        )
        .order("created_at", { ascending: false });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const transformedAnnouncements: Announcement[] = announcements.map(
        (announcement) => ({
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          excerpt: announcement.excerpt,
          category: announcement.category,
          author_id: announcement.author_id,
          author_name: announcement.author_name,
          created_at: announcement.created_at,
          read_time: announcement.read_time,
        })
      );

      return {
        success: true,
        data: transformedAnnouncements,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to search announcements",
      };
    }
  }

  subscribeToAnnouncements(callback: (announcements: Announcement[]) => void) {
    const subscription = supabase
      .channel("announcements-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "announcements",
        },
        (_payload) => {
          this.getAnnouncements().then((response) => {
            if (response.success && response.data) {
              callback(response.data);
            }
          });
        }
      )
      .subscribe();

    return subscription;
  }

  unsubscribeFromAnnouncements(subscription: any) {
    supabase.removeChannel(subscription);
  }
}

export const announcementService = new AnnouncementService();
