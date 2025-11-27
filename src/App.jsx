
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPages from './pages/Home';
import AboutPages from './pages/AboutUs';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/ResetPassword';

export default function App() {
  return (
    <>
      <Routes>
        <React.Fragment>
          <Route path="/" element={<LandingPages />} />
          <Route path="/about" element={<AboutPages />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </React.Fragment>
      </Routes>
    </>
  );
}
