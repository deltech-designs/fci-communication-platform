// src/components/Auth/LoginForm.js
import React, { useState } from "react";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      onLogin(data.user);
      navigate("/chat");
    } catch (error) {
      alert(error.response?.data.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded"
    >
      <h2 className="text-lg font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded-md"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-md"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
