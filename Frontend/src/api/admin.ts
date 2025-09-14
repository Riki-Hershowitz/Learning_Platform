import type { User, Prompt } from "./types";

export async function getAllUsers(token: string): Promise<User[]> {
  const res = await fetch("/api/admin/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function getAllPrompts(token: string): Promise<Prompt[]> {
  const res = await fetch("/api/prompts", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
