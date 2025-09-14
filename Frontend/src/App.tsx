import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/Dashboard";
import HistoryPage from "./pages/History";
import AdminPage from "./pages/AdminDashboard";

const ADMIN_ID = "68c5f5fa70c96b436110e409";

const App: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const n = localStorage.getItem("userName");
    const i = localStorage.getItem("userId");
    if (t && n && i) {
      setToken(t);
      setUserName(n);
      setUserId(i);
      setIsAdmin(i === ADMIN_ID);
    }
  }, []);

  const handleUserRegister = (id: string, name: string, token: string) => {
    setUserId(id);
    setUserName(name);
    setToken(token);
    setIsAdmin(id === ADMIN_ID);
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userId", id);
  };

  const handleLogout = () => {
    setUserId(null);
    setUserName(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.clear();
  };

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
              userId && token
                ? isAdmin
                  ? <Navigate to="/admin" replace />
                  : <Navigate to="/dashboard" replace />
                : <RegisterPage onRegister={handleUserRegister} />
            }
          />
          <Route
            path="/dashboard"
            element={userId && token ? <DashboardPage userId={userId} token={token} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/history"
            element={userId && token ? <HistoryPage userId={userId} token={token} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin"
            element={isAdmin && token ? <AdminPage token={token} /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
