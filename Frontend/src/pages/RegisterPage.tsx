import React, { useState } from "react";
import { registerUser } from "../api/users";

interface RegisterPageProps {
  onRegister: (id: string, name: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");

  const handleRegister = async () => {
    setError("");
    if (!name.trim()) {
      setError("יש להזין שם");
      return;
    }
    if (!phone.trim()) {
      setError("יש להזין טלפון");
      return;
    }
    if (!/^\d{6,20}$/.test(phone)) {
      setError("הטלפון חייב להכיל 6-20 ספרות");
      return;
    }

    try {
      const user = await registerUser(name, phone);
      onRegister(user.id, user.name);
      setError("");
    } catch (err) {
      console.error(err);
      setError("רישום המשתמש נכשל");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2 className="heading hebrew">הרשמה</h2>
      <label className="label hebrew">שם</label>
      <input
        className="input"
        type="text"
        placeholder="הכנס שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="label hebrew">טלפון</label>
      <input
        className="input"
        type="text"
        placeholder="הכנס מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="button" onClick={handleRegister}>
        הרשמה
      </button>
      {error && <div className="alert-error">{error}</div>}
    </div>
  );
};

export default RegisterPage;
