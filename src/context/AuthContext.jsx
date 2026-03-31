import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoUsers } from "../data/mockData";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  user: "aletheia_user",
  token: "aletheia_token",
  accessToken: "aletheia_access_token",
  refreshToken: "aletheia_refresh_token",
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
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const loadedUsers = getStoredUsers();
    setUsers(loadedUsers);

    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const storedAccessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    const storedRefreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);

    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
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

  const register = async ({ name, email, role, user: apiUser, access, refresh }) => {
    console.log("🔐 AuthContext.register called with:", { name, email, role, apiUser, access: "***" });
    
    // If JWT tokens are provided from API response, use them
    if (apiUser && access && refresh) {
      console.log("📦 Using API response - creating session user...");
      
      const sessionUser = {
        id: apiUser.id,
        name: apiUser.full_name || name,
        email: apiUser.email,
        role: apiUser.role,
        username: apiUser.username,
        firstName: apiUser.first_name,
        lastName: apiUser.last_name,
        isActive: apiUser.is_active,
        createdAt: apiUser.created_at
      };

      console.log("💾 Storing user and tokens in localStorage...", sessionUser);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(sessionUser));
      localStorage.setItem(STORAGE_KEYS.accessToken, access);
      localStorage.setItem(STORAGE_KEYS.refreshToken, refresh);
      localStorage.setItem(STORAGE_KEYS.token, access); // Keep for backward compatibility

      console.log("🔄 Updating auth state...");
      setCurrentUser(sessionUser);
      setAccessToken(access);
      setRefreshToken(refresh);

      console.log("✅ User registered and authenticated successfully");
      return {
        success: true,
        user: sessionUser
      };
    }

    console.log("⚠️  Falling back to mock registration (no API response)");
    // Fallback to mock registration
    const loadedUsers = getStoredUsers();
    const emailExists = loadedUsers.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      console.warn("❌ Email already exists:", email);
      return {
        success: false,
        message: "That email already exists."
      };
    }

    const newUser = {
      id: loadedUsers.length + 1,
      name,
      email,
      role
    };

    const updatedUsers = [...loadedUsers, newUser];
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    console.log("✅ Mock user created:", newUser);
    return {
      success: true,
      user: newUser
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    setCurrentUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      isAuthenticated: Boolean(currentUser),
      accessToken,
      refreshToken,
      login,
      register,
      logout
    }),
    [currentUser, users, accessToken, refreshToken]
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
