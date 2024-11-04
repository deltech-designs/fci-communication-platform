// src/components/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users (admin-only route)
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="text-xl font-semibold">User List:</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.isAdmin ? "Admin" : "User"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
