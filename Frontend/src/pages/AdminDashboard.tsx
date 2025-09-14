import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts } from "../api/admin";
import type { User, Prompt } from "../api/types";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

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
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <h3>All Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.phone}
          </li>
        ))}
      </ul>

      <h3>All Prompts</h3>
      {prompts.map((item) => (
        <div key={item.id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <p><strong>User ID:</strong> {item.user_id}</p>
          <p><strong>Category ID:</strong> {item.category_id}</p>
          <p><strong>SubCategory ID:</strong> {item.sub_category_id}</p>
          <p><strong>Prompt:</strong> {item.prompt}</p>
          <p><strong>Response:</strong> {item.response}</p>
          <p><em>Created at: {item.created_at}</em></p>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
