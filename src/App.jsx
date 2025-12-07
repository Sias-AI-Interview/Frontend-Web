import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPages from "./pages/Home";
import AboutPages from "./pages/AboutUs";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import AuthCallback from "./pages/auth/AuthCallback";
import Dashboard from "./pages/users/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import OauthCallback from "./pages/OauthCallback";
import ProfilePage from "./pages/users/Profile";
import UploadPage from "./pages/users/Upload";
import ReportsPage from "./pages/users/Reports";
import CandidatesPage from "./pages/users/Candidates";
import SettingsPage from "./pages/users/Settings";
import CandidateDetailPage from "./pages/users/CandidateDetails";
import AnalyzingPage from "./pages/users/AI-Analyzing";
import AssessmentPage from "./pages/users/AI-Assesment";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/about" element={<AboutPages />} />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/outh/callback" element={<OauthCallback />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/upload" element={
        <ProtectedRoute>
          <UploadPage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/upload/ai-analyzing" element={
        <ProtectedRoute>
          <AnalyzingPage />
        </ProtectedRoute>
      } />


      <Route path="/dashboard/upload/ai-assessment" element={
        <ProtectedRoute>
          <AssessmentPage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/reports" element={
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      } />



      <Route path="/dashboard/assesment-result" element={
        <ProtectedRoute>
          <CandidatesPage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/assesment-result/:id" element={
        <ProtectedRoute>
          <CandidateDetailPage />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />


      <Route path="*" element={<Login />} />
    </Routes>
  );
}
