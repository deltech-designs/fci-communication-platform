// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/api";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token); // Store the JWT token
      onLoginSuccess(data.user); // Pass user data to parent component
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f1f1f1]">
      <div className="bg-white shadow-lg mx-auto flex flex-col w-2/5 h-1/2 p-4">
        <h1 className="text-center text-[24px]">Login </h1>
        <form
          className="flex flex-col justify-center items-center p-4 gap-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-4/5 p-3 border rounded outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-4/5 p-3 border rounded outline-none"
          />
          <button
            className="bg-blue-500 w-4/5 px-6 py-2 text-white rounded-full"
            type="submit"
          >
            Login
          </button>
          <span>
            Create an account{" "}
            <Link to="/register" className="font-medium">
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
