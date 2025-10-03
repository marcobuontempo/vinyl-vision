import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserType } from "../../../shared/types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../api";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: UserType | null;
  getCurrentUserLocalStorage: () => UserType | null;
  loginSaveUser: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getCurrentUserLocalStorage();
    setUser(userData);
  }, []);

  const loginSaveUser = async (token: string) => {
    localStorage.setItem("token", token);

    // set default header for axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(jwtDecode(token));
  };

  const getCurrentUserLocalStorage = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // set axios header on refresh/page load
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const savedUser = jwtDecode(token) as UserType;
      return savedUser;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    getCurrentUserLocalStorage,
    loginSaveUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
