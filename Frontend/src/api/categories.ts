import axios from "axios";
import type { Category, SubCategory } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

// מביא את כל הקטגוריות
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await axios.get<Category[]>(`${API_URL}/categories`);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// מביא תתי־קטגוריות לפי קטגוריה
export async function getSubCategories(categoryId: string): Promise<SubCategory[]> {
  try {
    const res = await axios.get<SubCategory[]>(`${API_URL}/sub-categories?category_id=${categoryId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching sub categories:", error);
    throw error;
  }
}
