// src/components/Auth/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful. Please log in.");
      navigate("/login"); // Redirect to login page after registration
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
