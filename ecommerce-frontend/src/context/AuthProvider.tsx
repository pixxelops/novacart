import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { decodeJwt } from "../utils/jwt";

function getStoredPayload() {
  const token = localStorage.getItem("token");
  return token ? decodeJwt(token) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );
  const [isAdmin, setIsAdmin] = useState(
    () => getStoredPayload()?.roles?.includes("ROLE_ADMIN") ?? false
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    () => getStoredPayload()?.sub ?? null
  );

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const payload = decodeJwt(token);

    setIsAuthenticated(true);
    setIsAdmin(payload?.roles?.includes("ROLE_ADMIN") ?? false);
    setUserEmail(payload?.sub ?? null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
