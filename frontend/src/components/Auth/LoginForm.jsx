// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token); // Save token in localStorage
      onLoginSuccess(data.user); // Pass user data to parent component
      navigate("/chat"); // Redirect to chat after successful login
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
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
        Login
      </button>
    </form>
  );
};

export default LoginForm;
