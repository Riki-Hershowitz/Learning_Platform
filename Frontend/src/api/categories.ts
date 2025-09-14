import axios from "axios";
import type { Category, SubCategory } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getCategories(token: string): Promise<Category[]> {
  const res = await axios.get<Category[]>(`${API_URL}/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getSubCategories(categoryId: string, token: string): Promise<SubCategory[]> {
  const res = await axios.get<SubCategory[]>(
    `${API_URL}/sub-categories?category_id=${categoryId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}
