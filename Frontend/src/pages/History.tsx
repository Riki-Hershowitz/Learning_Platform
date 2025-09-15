/**
 * דף היסטוריית למידה אישית
 * מציג למשתמש את כל השאלות ששלח והשיעורים שקיבל מה-AI
 */
import React, { useEffect, useState } from "react";
import { getUserPrompts } from "../api/prompts";
import type { Prompt } from "../api/types";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
  token: string;
}

const HistoryPage: React.FC<Props> = ({ userId, token }) => {
  // מצבי הרכיב - נתונים, טעינה ושגיאות
  const [history, setHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // טעינת היסטוריית הלמידה של המשתמש בטעינת הרכיב
  useEffect(() => {
    setLoading(true);
    setError("");
    getUserPrompts(userId, token)
      .then(setHistory)
      .catch(() => {
        setError("שגיאה בטעינת היסטוריה");
        setHistory([]);
      })
      .finally(() => setLoading(false));
  }, [userId, token]);

  return (
    <div className="card" style={{ maxWidth: 600, margin: "3rem auto" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/dashboard" className="button" style={{ fontSize: "1em", padding: "0.5em 1.2em" }}>
          דף הבית
        </Link>
      </nav>
      <h2 className="heading hebrew">היסטוריית למידה</h2>
      {loading ? (
        <div style={{ textAlign: "center", margin: 30 }}>טוען...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : history.length === 0 ? (
        <div className="alert-error" style={{ background: "#ffe6e6" }}>אין היסטוריה עדיין.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {history.map((item) => (
            <li key={item.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
              <p>
                <strong>קטגוריה:</strong> <span className="small">{item.category_id}</span>
                {" | "}
                <strong>תת-קטגוריה:</strong> <span className="small">{item.sub_category_id}</span>
              </p>
              <p><strong>Prompt:</strong> <span className="english">{item.prompt}</span></p>
              <p><strong>Response:</strong> <span className="english">{item.response}</span></p>
              <p className="small"><em>נוצר בתאריך: {new Date(item.created_at).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
