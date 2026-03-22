import { createClient } from "@supabase/supabase-js";

const isBrowser = typeof window !== "undefined";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Environment Check:", {
  isBrowser,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl ? "LOADED" : "MISSING",
  key: supabaseAnonKey ? "LOADED" : "MISSING",
});

if (!supabaseUrl) {
  throw new Error(
    "VITE_SUPABASE_URL is not defined in environment variables. " +
      "Please check your .env.local file in the project root and make sure it uses VITE_ prefix."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "VITE_SUPABASE_ANON_KEY is not defined in environment variables. " +
      "Please check your .env.local file in the project root and make sure it uses VITE_ prefix."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "college_editor" | "viewer";
          college: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role: "admin" | "college_editor" | "viewer";
          college?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "admin" | "college_editor" | "viewer";
          college?: string | null;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          category: string;
          author_id: string;
          author_name: string;
          read_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt: string;
          category: string;
          author_id: string;
          author_name: string;
          read_time?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string;
          category?: string;
          author_id?: string;
          author_name?: string;
          read_time?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type SupabaseClient = typeof supabase;
