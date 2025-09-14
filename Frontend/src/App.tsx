import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import AdminPage from "./pages/AdminDashboard";

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // שמירה לאחר הרשמה userId
const handleUserRegister = (id: string) => {
  setUserId(id);

  // בדיקה אם המשתמש הוא אדמין
  const adminId = "68c5f5fa70c96b436110e409";
  setIsAdmin(id === adminId);
};

//כפתור התנתקות
const handleLogout = () => {
  setUserId(null);   // איפוס משתמש
  setIsAdmin(false); // איפוס סטטוס
};



  return (
    <Router>
<div>
  {userId && (
    <button onClick={handleLogout} style={{ position: "absolute", top: 10, right: 10 }}>
      Logout
    </button>
  )}

  <Routes>
    <Route
      path="/"
      element={
        userId
          ? isAdmin
            ? <Navigate to="/admin" replace />
            : <Navigate to="/dashboard" replace />
          : <RegisterPage onRegister={handleUserRegister} />
      }
    />
    <Route
      path="/dashboard"
      element={userId ? <DashboardPage userId={userId} /> : <Navigate to="/" replace />}
    />
    <Route
      path="/history"
      element={userId ? <HistoryPage userId={userId} /> : <Navigate to="/" replace />}
    />
    <Route
      path="/admin"
      element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</div>

    </Router>
  );
};

export default App;
