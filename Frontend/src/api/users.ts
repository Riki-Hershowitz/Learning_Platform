import axios from "axios";
import type { User } from "./types";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;


// רישום משתמש חדש
export async function registerUser(name: string, phone: string): Promise<User> {
  try {
    const res = await axios.post<User>(API_URL, { name, phone });
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// קבלת מידע על משתמש לפי id
export async function getUser(userId: number): Promise<User> {
  try {
    const res = await axios.get<User>(`${API_URL}/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
