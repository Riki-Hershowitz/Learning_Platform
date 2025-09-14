import React, { useState } from "react";
import { registerUser } from "../api/users";

interface RegisterPageProps {
  onRegister: (id: string) => void; // פונקציה שמודיעה ל-App על ההרשמה
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>("");

const handleRegister = async () => {
  // ולידציה
  if (!name.trim()) {
    setError("Name is required");
    return;
  }
  if (!phone.trim()) {
    setError("Phone is required");
    return;
  }
  if (!/^\d{6,20}$/.test(phone)) { 
    setError("Phone must be 6-20 digits");
    return;
  }

  try {
    const user = await registerUser(name, phone);
    onRegister(user.id);
    setError("");
    alert(`User registered! Your ID: ${user.id}`);
  } catch (err) {
    console.error(err);
    setError("Failed to register user");
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
