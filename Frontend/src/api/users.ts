import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export interface RegisteredUser {
  id: string;
  name: string;
  token: string;
}

// רישום משתמש חדש
export async function registerUser(name: string, phone: string) {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json(); // { id, name, token }
}

// קבלת מידע על משתמש לפי id (אם צריך בעתיד)
export async function getUser(userId: string, token: string): Promise<RegisteredUser> {
  try {
    const res = await axios.get<RegisteredUser>(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
