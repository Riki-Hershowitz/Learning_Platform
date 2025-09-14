import React, { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../api/categories";
import { submitPrompt } from "../api/prompts";
import type { Category, SubCategory } from "../api/types";
import { Link } from "react-router-dom";

interface Props {
  userId: string;
}

const DashboardPage: React.FC<Props> = ({ userId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    const data = await getSubCategories(categoryId);
    setSubCategories(data);
    setSelectedSubCategory(null);
  };

  const handleSendPrompt = async () => {
    if (!selectedCategory || !selectedSubCategory || !prompt) return;
    const data = await submitPrompt(userId, selectedCategory, selectedSubCategory, prompt);
    setResponse(data.response);
  };

  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/history">History</Link>
      </nav>

      <h2>Dashboard</h2>

      <div>
        <label>Category:</label>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>SubCategory:</label>
        <select
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">Select</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleSendPrompt}>Send</button>
      </div>

      {response && (
        <div style={{ marginTop: 20, border: "1px solid black", padding: 10 }}>
          <h3>Lesson:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
