/**
 * API פונקציות לניהול משתמשים
 * כולל רישום משתמש חדש וקבלת פרטי משתמש
 */
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export interface RegisteredUser {
  id: string;
  name: string;
  token: string;
}

/**
 * רישום משתמש חדש במערכת
 * אם המשתמש כבר קיים, המערכת מחזירה את פרטיו הקיימים
 */
export async function registerUser(name: string, phone: string) {
  try {
    const res = await axios.post(`${API_URL}/register`, { name, phone });
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
}

/**
 * קבלת פרטי משתמש לפי מזהה
 */
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
