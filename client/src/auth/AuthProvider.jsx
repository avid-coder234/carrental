import { createContext, useState, useEffect } from "react";

export const AuthCtx = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // decode once after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      try {
        const data = JSON.parse(atob(token.split(".")[1]));
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch {
        localStorage.clear();
      }
    }
  }, []);

  const login = token => {
    localStorage.setItem("token", token);
    const data = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
