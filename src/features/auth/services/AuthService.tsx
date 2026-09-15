import { supabase } from "../../../lib/supabase";
import type { User, LoginCredentials, ApiResponse } from "../../../types";

class AuthService {
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const { data: authData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

      if (signInError) {
        return {
          success: false,
          message: signInError.message,
        };
      }

      if (!authData.user || !authData.session) {
        return {
          success: false,
          message: "Login failed - no user or session returned",
        };
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        if (profileError.code === "PGRST116") {
          const { data: newProfile, error: createError } = await supabase
            .from("user_profiles")
            .insert({
              id: authData.user.id,
              email: authData.user.email || credentials.email,
              name: authData.user.user_metadata?.name || "User",
              role: "viewer" as const,
            })
            .select()
            .single();

          if (createError) {
            return {
              success: false,
              message: "Failed to create user profile",
            };
          }

          const user: User = {
            id: newProfile.id,
            email: newProfile.email,
            name: newProfile.name,
            role: newProfile.role,
            college: newProfile.college || undefined,
            created_at: newProfile.created_at,
          };

          return {
            success: true,
            data: {
              user,
              token: authData.session.access_token,
            },
          };
        }

        return {
          success: false,
          message: "Failed to load user profile",
        };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        college: profile.college || undefined,
        created_at: profile.created_at,
      };

      return {
        success: true,
        data: {
          user,
          token: authData.session.access_token,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      };
    }
  }

  async verifyToken(_token: string): Promise<ApiResponse<User>> {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        return {
          success: false,
          message: "Invalid session",
        };
      }

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        return {
          success: false,
          message: "Failed to load user profile",
        };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        college: profile.college || undefined,
        created_at: profile.created_at,
      };

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Token verification failed",
      };
    }
  }

  async updateProfile(
    userId: string,
    updates: Partial<Pick<User, "name" | "college">>
  ): Promise<ApiResponse<User>> {
    try {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        college: profile.college || undefined,
        created_at: profile.created_at,
      };

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Profile update failed",
      };
    }
  }

  async updateUserRole(
    userId: string,
    role: User["role"],
    college?: string
  ): Promise<ApiResponse<User>> {
    try {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .update({ role, college })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        college: profile.college || undefined,
        created_at: profile.created_at,
      };

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Role update failed",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async hasRole(requiredRoles: User["role"][]): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      return profile ? requiredRoles.includes(profile.role) : false;
    } catch (error) {
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return session?.access_token || null;
    } catch (error) {
      return null;
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          const user: User = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            college: profile.college || undefined,
            created_at: profile.created_at,
          };
          callback(user);
        }
      } else if (event === "SIGNED_OUT") {
        callback(null);
      }
    });
  }
}

export const authService = new AuthService();
