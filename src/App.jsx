import React from 'react';
import AdminDashboard from './pages/AdminDashboard';
import SuccessPage from './pages/SuccessPage';
import TimetablePage from './pages/TimetablePage';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/AdminDashboard" replace />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/timetable" element={<TimetablePage />} />
    </Routes>
  );
}