/**
 * API פונקציות ללוח המנהל
 * מאפשר למנהל לצפות בכל המשתמשים והשאלות במערכת
 */
import axios from "axios";
import type { User, Prompt } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * קבלת רשימת כל המשתמשים במערכת - למנהל בלבד
 */
export async function getAllUsers(token: string): Promise<User[]> {
  const res = await axios.get<User[]>(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

/**
 * קבלת רשימת כל השאלות והתשובות במערכת - למנהל בלבד
 */
export async function getAllPrompts(token: string): Promise<Prompt[]> {
  const res = await axios.get<Prompt[]>(`${API_URL}/prompts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
