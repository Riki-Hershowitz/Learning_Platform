/**
 * דף הרשמה והתחברות למערכת
 * מאפשר למשתמשים חדשים להירשם או למשתמשים קיימים להתחבר
 */
import React, { useState } from "react";
import { registerUser } from "../api/users";

// תבנית ולידציה למספר טלפון: 6-20 ספרות
const PHONE_VALIDATION_PATTERN = /^\d{6,20}$/;

interface RegisterPageProps {
  onRegister: (id: string, name: string, token: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  // מצבי הרכיב - נתוני הטופס ושגיאות
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");

  // טיפול בהרשמה/התחברות עם ולידציה וטיפול בשגיאות
  const handleRegister = async () => {
    setError("");
    
    // ולידציה בסיסית של שדות הקלט
    if (!name.trim()) {
      setError("יש להזין שם");
      return;
    }
    if (!phone.trim()) {
      setError("יש להזין טלפון");
      return;
    }
    if (!PHONE_VALIDATION_PATTERN.test(phone)) {
      setError("הטלפון חייב להכיל 6-20 ספרות");
      return;
    }

    try {
      const user = await registerUser(name, phone);
      if (user && user.id && user.name && user.token) {
        onRegister(user.id, user.name, user.token);
      } else {
        setError("שגיאה: לא התקבלו נתונים תקינים מהשרת");
      }
    } catch (err: any) {
      const serverMessage = err?.response?.data?.detail || err?.response?.data?.message;
      
      // טיפול מתקדם בשגיאות לפי סוג
      if (err?.response?.status === 400) {
        if (serverMessage === "User already exists") {
          setError("משתמש עם מספר טלפון זה כבר קיים");
        } else {
          setError("שגיאה: נתונים לא תקינים");
        }
      } else if (err?.response?.status === 500) {
        setError("שגיאת שרת: אנא נסה שוב מאוחר יותר");
      } else if (err?.code === 'ERR_NETWORK') {
        setError("שגיאת רשת: בדוק את החיבור לאינטרנט");
      } else {
        setError(serverMessage || `שגיאה ברישום: ${err?.message || 'אנא נסה שוב'}`);
      }
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
