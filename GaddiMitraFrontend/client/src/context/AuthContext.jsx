// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Initialize as null instead of reading from localStorage

  useEffect(() => {
    // This effect runs once when the component mounts
    // Clear any existing token from localStorage
    localStorage.removeItem("token");
  }, []); // Empty dependency array means this runs only once on mount

  // Save token and user on login
  const login = (userData) => {
    setUser(userData);
    setToken(userData.token); // assumes userData includes token
    localStorage.setItem("token", userData.token);
  };

  // Clear token and user on logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    alert("Logged out successfully.");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);