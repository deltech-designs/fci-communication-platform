// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm";
import LoginForm from "./components/Auth/RegisterForm";
import ChatDashboard from "./components/Chat/Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Assume user is logged in if token exists
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={!user ? <RegisterForm /> : <Navigate to="/chat" />}
        />
        <Route
          path="/login"
          element={
            !user ? <LoginForm onLogin={setUser} /> : <Navigate to="/chat" />
          }
        />
        <Route
          path="/chat"
          element={
            user ? (
              <ChatDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/chat" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
