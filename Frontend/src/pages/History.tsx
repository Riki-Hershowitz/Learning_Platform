import React, { useEffect, useState } from "react";
import { getUserPrompts } from "../api/prompts";
import type { Prompt } from "../api/types";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
}

const HistoryPage: React.FC<Props> = ({ userId }) => {
  const [history, setHistory] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getUserPrompts(userId);
      setHistory(data);
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="card" style={{ maxWidth: 600, margin: "3rem auto" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/dashboard" className="button" style={{ fontSize: "1em", padding: "0.5em 1.2em" }}>
          למד שיעור  
        </Link>
      </nav>
      <h2 className="heading">היסטוריית למידה</h2>
      {history.length === 0 ? (
        <div className="alert-error" style={{ background: "#ffe6e6" }}>אין היסטוריה עדיין.</div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {history.map((item) => (
            <li key={item.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
              <p><strong>Prompt:</strong> {item.prompt}</p>
              <p><strong>Response:</strong> {item.response}</p>
              <p className="small"><em>נוצר בתאריך: {new Date(item.created_at).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
