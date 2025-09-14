import axios from "axios";
import type { Prompt } from "./types";

const API_URL = `${import.meta.env.VITE_API_URL}/prompts`;

// שליחת prompt ל-AI ולשמירתו ב-DB
export async function submitPrompt(
  userId: string,
  categoryId: string,
  subCategoryId: string,
  prompt: string
): Promise<Prompt> {
  try {
    const res = await axios.post<Prompt>(API_URL, {
      user_id: userId,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      prompt,
    });
    return res.data;
  } catch (error) {
    console.error("Error sending prompt:", error);
    throw error;
  }
}

// קבלת כל ההיסטוריה של משתמש
export async function getUserPrompts(userId: string): Promise<Prompt[]> {
  try {
    const res = await axios.get<Prompt[]>(`${API_URL}/by-user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching user prompts:", error);
    throw error;
  }
}
