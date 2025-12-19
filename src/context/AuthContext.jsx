import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize tokens from localStorage
  const [tokens, setTokens] = useState(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    return access && refresh ? { access, refresh } : null;
  });

  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // --- Fetch full user profile ---
  const fetchUserProfile = useCallback(async (accessToken) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  }, []);

  // --- LOGIN ---
  const login = useCallback(
    async (username, password) => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, error: data.detail || "Login failed" };
        }

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setTokens({ access: data.access, refresh: data.refresh });

        const profile = await fetchUserProfile(data.access);
        if (profile) {
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        }

        navigate("/"); // redirect to home
        return { success: true };
      } catch (err) {
        return { success: false, error: "Network error" };
      }
    },
    [navigate, fetchUserProfile]
  );

  // --- REGISTER ---
  const register = useCallback(
    async (username, password, email, first_name, last_name, phone, country) => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email, first_name, last_name, phone, country }),
        });

        const data = await res.json();
        if (!res.ok) {
          return { success: false, error: data.detail || "Registration failed" };
        }

        navigate("/login");
        return { success: true };
      } catch (err) {
        return { success: false, error: "Network error" };
      }
    },
    [navigate]
  );

  // --- LOGOUT ---
  const logout = useCallback(() => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // --- REFRESH TOKEN ---
  const refreshToken = useCallback(async () => {
    if (!tokens?.refresh) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      if (!res.ok) {
        logout();
        return;
      }

      const data = await res.json();
      localStorage.setItem("access", data.access);
      setTokens((prev) => ({ ...prev, access: data.access }));

      // Update user profile after refresh
      const profile = await fetchUserProfile(data.access);
      if (profile) {
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
    } catch (err) {
      logout();
    }
  }, [tokens, logout, fetchUserProfile]);

  // --- Auto refresh every 10 minutes ---
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 10);

    return () => clearInterval(interval);
  }, [refreshToken]);

  // --- Refresh token and fetch profile on app load ---
  useEffect(() => {
    const initializeAuth = async () => {
      if (tokens?.refresh) {
        await refreshToken();
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

    return (
    <AuthContext.Provider
      value={{ user, tokens, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
