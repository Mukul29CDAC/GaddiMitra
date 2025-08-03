// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // navigate("/"); // Redirect to home or login page after logout
    alert("Logged out successfully.");
    
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user,login, isAuthenticated,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
