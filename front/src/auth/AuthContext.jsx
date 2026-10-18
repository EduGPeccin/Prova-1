
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const loading = false;

  // Login
  const login = useCallback(async ({ email, password }) => {
    const { data } = await http.post("/auth/login", {
      email,
      password,
    });

    if (!data?.token) {
      throw new Error("Token ausente na resposta do servidor.");
    }

    const loggedUser = data.user ?? data.usuario ?? null;

    localStorage.setItem("token", data.token);
    setToken(data.token);

    if (loggedUser) {
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }

    return data;
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
    }),
    [token, user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de autenticação
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
