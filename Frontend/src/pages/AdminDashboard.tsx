import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts } from "../api/admin";
import type { User, Prompt } from "../api/types";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tab, setTab] = useState<"users" | "prompts">("users");

  useEffect(() => {
    const fetchAdminData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
      const promptsData = await getAllPrompts();
      setPrompts(promptsData);
    };
    fetchAdminData();
  }, []);

  return (
    <div className="card" style={{ maxWidth: 700, margin: "3rem auto" }}>
      <h2 className="heading">לוח מנהל</h2>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <button
          className="button"
          style={{
            background: tab === "users" ? "var(--color-primary)" : "var(--color-primary-light)",
            color: tab === "users" ? "#fff" : "var(--color-heading)",
            flex: 1,
          }}
          onClick={() => setTab("users")}
        >
          משתמשים
        </button>
        <button
          className="button"
          style={{
            background: tab === "prompts" ? "var(--color-primary)" : "var(--color-primary-light)",
            color: tab === "prompts" ? "#fff" : "var(--color-heading)",
            flex: 1,
          }}
          onClick={() => setTab("prompts")}
        >
          כל הפרומפטים
        </button>
      </div>
      {tab === "users" && (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {users.map((user) => (
            <li key={user.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <div className="small">{user.phone}</div>
            </li>
          ))}
        </ul>
      )}
      {tab === "prompts" && (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {prompts.map((item) => (
            <li key={item.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
              <p><strong>Prompt:</strong> {item.prompt}</p>
              <p><strong>Response:</strong> {item.response}</p>
              <p className="small"><em>נוצר בתאריך: {new Date(item.created_at).toLocaleString()}</em></p>
              <p className="small">משתמש: {item.user_id} | קטגוריה: {item.category_id} | תת-קטגוריה: {item.sub_category_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
