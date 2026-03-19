import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoUsers } from "../data/mockData";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  user: "aletheia_user",
  token: "aletheia_token",
  users: "aletheia_users"
};

const getStoredUsers = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.users);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return demoUsers;
    }
  }
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(demoUsers));
  return demoUsers;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadedUsers = getStoredUsers();
    setUsers(loadedUsers);

    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const login = async ({ email, password }) => {
    const loadedUsers = getStoredUsers();
    const foundUser = loadedUsers.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!foundUser || !password.trim()) {
      return {
        success: false,
        message: "Invalid email or password."
      };
    }

    const sessionUser = { ...foundUser };
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(sessionUser));
    localStorage.setItem(STORAGE_KEYS.token, "mock-session-token");
    setCurrentUser(sessionUser);

    return {
      success: true,
      user: sessionUser
    };
  };

  const register = async ({ name, email, company, role }) => {
    const loadedUsers = getStoredUsers();
    const emailExists = loadedUsers.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message: "That email already exists."
      };
    }

    const newUser = {
      id: loadedUsers.length + 1,
      name,
      email,
      company,
      role
    };

    const updatedUsers = [...loadedUsers, newUser];
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    return {
      success: true,
      user: newUser
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      isAuthenticated: Boolean(currentUser),
      login,
      register,
      logout
    }),
    [currentUser, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
