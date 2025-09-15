/**
 * API פונקציות לניהול שאלות ותשובות AI
 * כולל שליחת שאלות ל-AI וקבלת היסטוריית למידה
 */
import axios from "axios";
import type { Prompt } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * קבלת היסטוריית למידה של משתמש ספציפי
 */
export async function getUserPrompts(userId: string, token: string): Promise<Prompt[]> {
  const res = await axios.get<Prompt[]>(`${API_URL}/prompts/by-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

/**
 * שליחת שאלה חדשה ל-AI וקבלת שיעור מותאם אישית
 */
export async function submitPrompt(
  userId: string,
  categoryId: string,
  subCategoryId: string,
  prompt: string,
  token: string
): Promise<{ response: string }> {
  const res = await axios.post<{ response: string }>(`${API_URL}/prompts`, {
    user_id: userId,
    category_id: categoryId,
    sub_category_id: subCategoryId,
    prompt
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

