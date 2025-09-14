import axios from "axios";
import type { User, Prompt } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

// קבלת כל המשתמשים
export async function getAllUsers(): Promise<User[]> {
  try {
    const res = await axios.get<User[]>(`${API_URL}/users`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

// קבלת כל ההיסטוריה של כל המשתמשים
export async function getAllPrompts(): Promise<Prompt[]> {
  try {
    const res = await axios.get<Prompt[]>(`${API_URL}/prompts`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all prompts:", error);
    throw error;
  }
}
