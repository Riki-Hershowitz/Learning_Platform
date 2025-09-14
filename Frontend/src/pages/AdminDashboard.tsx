import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts } from "../api/admin";
import type { User, Prompt } from "../api/types";

interface AdminPageProps {
  token: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ token }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [tab, setTab] = useState<"users" | "prompts">("users");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const fetchAdminData = async () => {
      const usersData = await getAllUsers(token);
      setUsers(usersData);
      const promptsData = await getAllPrompts(token);
      setPrompts(promptsData);
    };
    fetchAdminData();
  }, [token]);

  // Filtering
  const filteredUsers = users.filter(u =>
    u.name.includes(search) || u.phone.includes(search)
  );
  const filteredPrompts = prompts.filter(p =>
    p.prompt.includes(search) || p.response.includes(search)
  );

  const pagedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  const pagedPrompts = filteredPrompts.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="card" style={{ maxWidth: 700, margin: "3rem auto" }}>
      <h2 className="heading hebrew">לוח מנהל</h2>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <button
          className="button"
          style={{
            background: tab === "users" ? "var(--color-primary)" : "var(--color-primary-light)",
            color: tab === "users" ? "#fff" : "var(--color-heading)",
            flex: 1,
          }}
          onClick={() => { setTab("users"); setPage(1); }}
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
          onClick={() => { setTab("prompts"); setPage(1); }}
        >
          כל הפרומפטים
        </button>
      </div>
      <input
        className="input"
        placeholder={tab === "users" ? "חפש לפי שם או טלפון" : "חפש בפרומפטים/תשובות"}
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{ marginBottom: 20 }}
      />
      {tab === "users" && (
        <>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pagedUsers.map((user) => (
              <li key={user.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
                <div style={{ fontWeight: 700 }}>{user.name}</div>
                <div className="small">{user.phone}</div>
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredUsers.length}
            onPage={setPage}
          />
        </>
      )}
      {tab === "prompts" && (
        <>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pagedPrompts.map((item) => (
              <li key={item.id} className="card" style={{ background: "#f9fafc", marginBottom: 16 }}>
                <p><strong>Prompt:</strong> <span className="english">{item.prompt}</span></p>
                <p><strong>Response:</strong> <span className="english">{item.response}</span></p>
                <p className="small"><em>נוצר בתאריך: {new Date(item.created_at).toLocaleString()}</em></p>
                <p className="small">משתמש: {item.user_id} | קטגוריה: {item.category_id} | תת-קטגוריה: {item.sub_category_id}</p>
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredPrompts.length}
            onPage={setPage}
          />
        </>
      )}
    </div>
  );
};

const Pagination: React.FC<{ page: number; pageSize: number; total: number; onPage: (p: number) => void }> = ({ page, pageSize, total, onPage }) => {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "1.5em 0" }}>
      <button className="button" disabled={page === 1} onClick={() => onPage(page - 1)}>הקודם</button>
      <span style={{ alignSelf: "center" }}>{page} / {pages}</span>
      <button className="button" disabled={page === pages} onClick={() => onPage(page + 1)}>הבא</button>
    </div>
  );
};

export default AdminPage;
