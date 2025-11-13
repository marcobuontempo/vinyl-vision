/**
 * AuthProvider Component.
 *
 * Provides authentication context to the application.
 * - Stores current "user" in state and syncs with localStorage.
 * - Provides login, logout, and current-user retrieval functions.
 * - Sets default authorisation header for API requests.
 *
 */

// TYPES IMPORTS
import type { ReactNode } from "react";
import type { UserType } from "@my/shared";
// NPM IMPORTS
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// LOCAL IMPORTS
import { api } from "../api";

// COMPONENT PROPS
type Props = {
  children: ReactNode;
};

// CONTEXT TYPE
type AuthContextType = {
  user: UserType | null;
  getCurrentUserLocalStorage: () => UserType | null;
  loginSaveUser: (token: string) => void;
  logout: () => void;
};

// CREATE CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access AuthContext.
 * @throws if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * AuthProvider component to wrap the app and provide authentication state.
 *
 * @param children - ReactNode elements that will consume the auth context.
 * @returns JSX element providing AuthContext to children.
 */
export const AuthProvider = ({ children }: Props) => {
  // Current authenticated user
  const [user, setUser] = useState<UserType | null>(null);
  // Navigation hook for redirecting on logout
  const navigate = useNavigate();

  // Initialise user state from localStorage on mount
  useEffect(() => {
    const userData = getCurrentUserLocalStorage();
    setUser(userData);
  }, []);

  /**
   * Save user token, set API headers, and update state.
   * @param token - JWT token string
   */
  const loginSaveUser = async (token: string) => {
    localStorage.setItem("token", token);

    // set default header for axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(jwtDecode(token));
  };

  /**
   * Retrieve current user from localStorage.
   * @returns UserType or null
   */
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

  // Logout user, clear state and localStorage, redirect to login page.
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  // Context value provided to consumers
  const value = {
    user,
    getCurrentUserLocalStorage,
    loginSaveUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
