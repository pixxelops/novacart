import {
  
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./AuthContext";
import { decodeJwt } from "../utils/jwt";




export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("token"))
  );


  const [isAdmin,setIsAdmin] = useState(() =>{
    const token = localStorage.getItem("token");

    if(!token){
      return false;
    }


    const payload = decodeJwt(token);

    return payload?.roles?.includes("ROLE_ADMIN") ?? false;

  })

  const login = (token: string) => {
    localStorage.setItem("token", token);

    const payload = decodeJwt(token);

    setIsAuthenticated(true);

    setIsAdmin(payload?.roles?.includes("ROLE_ADMIN") ?? false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}