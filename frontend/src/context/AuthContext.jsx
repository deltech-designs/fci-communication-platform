// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a Context for authentication
export const AuthContext = createContext();

// AuthProvider component provides the token and authentication state to the rest of the app
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Holds the user's token

  useEffect(() => {
    // Load the token from local storage when the app starts
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
