// src/components/Auth/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/api";
// import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Registration successful. Please log in.");
      navigate("/chat");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f1f1f1]">
      <div className="bg-white shadow-lg mx-auto flex flex-col w-2/5 h-1/2 p-4">
        <h1 className="text-center text-[24px]">Sign up </h1>
        <form
          className="flex flex-col justify-center items-center p-4 gap-4"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-4/5 p-3 border rounded outline-none"
          />
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
            Register
          </button>
          <span>
            Already, have an account{" "}
            <Link to="/login" className="font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
