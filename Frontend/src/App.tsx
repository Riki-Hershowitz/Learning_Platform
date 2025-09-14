import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import AdminPage from "./pages/AdminDashboard";

const ADMIN_ID = "68c5f5fa70c96b436110e409";

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // חדש
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // שמירה לאחר הרשמה userId ושם
  const handleUserRegister = (id: string, name?: string) => {
    setUserId(id);
    setUserName(name || null);
    setIsAdmin(id === ADMIN_ID);
  };

  // כפתור התנתקות
  const handleLogout = () => {
    setUserId(null);
    setUserName(null);
    setIsAdmin(false);
  };

  // תפריט ניווט עליון
  const NavBar = () => {
    const location = useLocation();
    if (!userId) return null;
    return (
      <header>
        <div className="logo">
          <span style={{ color: "var(--color-accent)", fontSize: 28, marginRight: 8 }}>★</span>
          פלטפורמת למידה חכמה
          {userName && (
            <span style={{
              fontSize: "1.1rem",
              color: "#3d6ef7",
              marginRight: 18,
              fontWeight: 700,
              verticalAlign: "middle"
            }}>
              | שלום, {userName}
            </span>
          )}
        </div>
        <nav>
          {!isAdmin && (
            <>
              <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>למידה</Link>
              <Link to="/history" className={location.pathname === "/history" ? "active" : ""}>היסטוריה</Link>
            </>
          )}
          {isAdmin && (
            <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>לוח מנהל</Link>
          )}
          <button className="button" style={{
            background: "var(--color-accent)",
            color: "#1f1f2e",
            fontWeight: 700,
            marginRight: 16,
            marginLeft: 8,
            padding: "0.5em 1.3em"
          }} onClick={handleLogout}>
            התנתקות
          </button>
        </nav>
      </header>
    );
  };

  return (
    <Router>
      <NavBar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              userId
                ? isAdmin
                  ? <Navigate to="/admin" replace />
                  : <Navigate to="/dashboard" replace />
                : <RegisterPage onRegister={(id, name) => handleUserRegister(id, name)} />
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
      </main>
    </Router>
  );
};

export default App;
