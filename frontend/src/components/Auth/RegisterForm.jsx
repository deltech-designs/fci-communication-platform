// src/components/Auth/RegisterForm.jsx
import React, { useState } from "react";
import api from "../../utils/api";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful. Please log in.");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
