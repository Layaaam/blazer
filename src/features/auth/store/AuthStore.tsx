// store/AuthStore.ts - DEBUG VERSION
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials } from "../../../types";
import { authService } from "../services/AuthService";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        console.log("🏪 AuthStore.login() called");
        set({ isLoading: true, error: null });

        try {
          console.log("🏪 Calling authService.login()...");
          const response = await authService.login(credentials);

          console.log("🏪 AuthService response:", {
            success: response.success,
            hasData: !!response.data,
            message: response.message,
          });

          if (response.success && response.data) {
            const { user, token } = response.data;
            console.log("🏪 Setting successful login state...");

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            console.log("🏪 Login state set successfully");
          } else {
            console.error("🏪 Login failed:", response.message);
            throw new Error(response.message || "Login failed");
          }
        } catch (error) {
          console.error("🏪 Login error caught in store:", error);
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          throw error;
        }
      },

      logout: async () => {
        console.log("🏪 AuthStore.logout() called");
        try {
          await authService.logout();
        } catch (error) {
          console.error("🏪 Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
          console.log("🏪 Logout state cleared");
        }
      },

      clearError: () => {
        console.log("🏪 AuthStore.clearError() called");
        set({ error: null });
      },

      checkAuth: async () => {
        console.log("🏪 AuthStore.checkAuth() called");
        const { token } = get();
        if (!token) {
          console.log("🏪 No token, skipping auth check");
          return;
        }

        set({ isLoading: true });

        try {
          const response = await authService.verifyToken(token);
          if (response.success && response.data) {
            console.log("🏪 Auth check successful");
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            console.log("🏪 Auth check failed, logging out");
            get().logout();
          }
        } catch (error) {
          console.error("🏪 Auth check error:", error);
          get().logout();
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
