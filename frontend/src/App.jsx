// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Chat from "./components/Chat/Chat";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Set the logged-in user
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    localStorage.removeItem("token"); // Remove token from local storage
  };

  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          {!user ? (
            <>
              {/* Redirect to Register by default */}
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/login"
                element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
              />
            </>
          ) : (
            <Route
              path="/chat"
              element={<Chat user={user} onLogout={handleLogout} />}
            />
          )}
          {/* Redirect to chat if logged in */}
          {user && <Route path="*" element={<Navigate to="/chat" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
