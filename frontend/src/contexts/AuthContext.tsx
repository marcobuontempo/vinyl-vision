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
    setUser(jwtDecode(token));
  };

  const getCurrentUserLocalStorage = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const savedUser = jwtDecode(token) as UserType;
      return savedUser;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
