/**
 * API פונקציות לניהול קטגוריות ותת-קטגוריות
 * מאפשר למשתמשים לבחור נושאי למידה
 */
import axios from "axios";
import type { Category, SubCategory } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * קבלת רשימת כל הקטגוריות הראשיות
 */
export async function getCategories(token: string): Promise<Category[]> {
  const res = await axios.get<Category[]>(`${API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

/**
 * קבלת תת-קטגוריות לפי קטגוריה ספציפית
 */
export async function getSubCategories(categoryId: string, token: string): Promise<SubCategory[]> {
  const res = await axios.get<SubCategory[]>(
    `${API_URL}/sub-categories?category_id=${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
