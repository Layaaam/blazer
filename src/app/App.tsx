// import { useState } from "react";

// // section imports
// import HeroSection from "../features/public-site/sections/HeroSection";
// import AnnouncementsSection from "../features/announcements/sections/AnnouncementsSection";
// import AboutUsSection from "../features/public-site/sections/AboutUsSection";
// import ContactSection from "../features/public-site/sections/ContactSection";

// // component imports
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import YearbookSection from "../features/public-site/sections/YearbookSection";

// function ServicesSection() {
//   return null;
// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <HeroSection />
//       <AnnouncementsSection />
//       <YearbookSection />
//       <AboutUsSection />
//       <ContactSection />
//       <Footer />
//     </div>
//   );
// }

// src/App.tsx

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "../features/auth/pages/LoginPage";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import EditorDashboard from "../features/college-editor/pages/CollegeEditorDashboard";
import ProtectedRoute from "../components/ProtectedRoutes";

import HeroSection from "../features/public-site/sections/HeroSection";
import AnnouncementsSection from "../features/announcements/sections/AnnouncementsSection";
import AboutUsSection from "../features/public-site/sections/AboutUsSection";
import ContactSection from "../features/public-site/sections/ContactSection";
import YearbookSection from "../features/public-site/sections/YearbookSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useAuthStore } from "../features/auth/store/AuthStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PublicLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-white"
      //     style={{
      //   transform: 'scale(0.8)',
      //   transformOrigin: 'top center',
      //   width: '125%', // Compensate for scaling down
      // }}
    >
      <Header />
      <HeroSection />
      <AnnouncementsSection />
      <YearbookSection />
      <AboutUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { checkAuth, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [checkAuth, token]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* College Editor Routes */}
      <Route
        path="/editor/*"
        element={
          <ProtectedRoute allowedRoles={["college_editor"]}>
            <EditorDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
