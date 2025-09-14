import type { Prompt } from "./types";

export async function getUserPrompts(userId: string, token: string): Promise<Prompt[]> {
  const res = await fetch(`/api/prompts/by-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function submitPrompt(
  userId: string,
  categoryId: string,
  subCategoryId: string,
  prompt: string,
  token: string
): Promise<{ response: string }> {
  const res = await fetch("/api/prompts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: userId,
      category_id: categoryId,
      sub_category_id: subCategoryId,
      prompt
    }),
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

