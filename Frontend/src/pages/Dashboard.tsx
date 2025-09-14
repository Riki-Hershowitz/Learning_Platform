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
  const [error, setError] = useState<string>("");

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
    setError("");
    setResponse("");
    if (!selectedCategory || !selectedSubCategory || !prompt) {
      setError("יש למלא את כל השדות");
      return;
    }
    try {
      const data = await submitPrompt(userId, selectedCategory, selectedSubCategory, prompt);
      setResponse(data.response);
    } catch (e) {
      setError("שגיאה בשליחת הבקשה");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: "3rem auto" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/history" className="button" style={{ fontSize: "1em", padding: "0.5em 1.2em" }}>
          היסטוריה
        </Link>
      </nav>
      <h2 className="heading">למידה חדשה</h2>
      <div>
        <label className="label">קטגוריה:</label>
        <select
          className="input"
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">בחר</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">תת-קטגוריה:</label>
        <select
          className="input"
          value={selectedSubCategory || ""}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          disabled={!selectedCategory}
        >
          <option value="">בחר</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">מה תרצה ללמוד?</label>
        <textarea
          className="input"
          style={{ minHeight: 70, resize: "vertical" }}
          placeholder="הכנס נושא או שאלה"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="button" style={{ width: "100%" }} onClick={handleSendPrompt}>
          שלח
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {response && (
        <div className="card" style={{ background: "#f9fafc", marginTop: 20 }}>
          <h3 className="heading" style={{ fontSize: "1.3rem" }}>השיעור שלך:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
