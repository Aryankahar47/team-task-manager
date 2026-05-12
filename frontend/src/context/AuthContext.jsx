import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
  return localStorage.getItem("token") || null;
});

const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("user")) || null;
});

  // load from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // login function
  const login = (data) => {
  setToken(data.token);
  setUser(data.user);

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

  // logout function
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};