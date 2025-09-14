export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

export interface Prompt {
  id: string;
  user_id: string;
  category_id: string;
  sub_category_id: string;
  prompt: string;
  response: string;
  created_at: string;
}
