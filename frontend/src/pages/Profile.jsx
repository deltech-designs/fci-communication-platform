import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.put("/api/users/profile", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Profile updated");
  };

  return (
    <div className="profile-form max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
