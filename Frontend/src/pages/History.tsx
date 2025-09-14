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
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <h2>History</h2>
      {history.map((item) => (
        <div key={item.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><strong>Prompt:</strong> {item.prompt}</p>
          <p><strong>Response:</strong> {item.response}</p>
          <p><em>Created at: {item.created_at}</em></p>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
