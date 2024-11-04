// src/components/Auth/RegisterForm.js
import React, { useState } from "react";
import { registerUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/chat");
    } catch (error) {
      alert(error.response?.data.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto bg-white shadow-md rounded flex flex-col gap-4"
    >
      <h2 className="text-lg font-bold">Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        className="border p-3 rounded-md"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded-md"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded-md"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
