export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "college_editor" | "viewer";
  college?: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author_id: string;
  author_name: string;
  created_at: string;
  read_time: string;
}

export interface ContactQuery {
  id: string;
  query_type: string;
  college: string;
  sender_email: string;
  sender_name: string;
  subject: string;
  message: string;
  status: "pending" | "in_progress" | "resolved";
  created_at: string;
  resolved_at?: string;
}

export interface EmailLog {
  id: string;
  announcement_id: string;
  recipient_email: string;
  status: "sent" | "delivered" | "failed" | "opened";
  sent_at: string;
  delivered_at?: string;
  opened_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
