
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        setToken(savedToken || null);

        try {
            setUser(savedUser ? JSON.parse(savedUser) : null);
        } catch {
            localStorage.removeItem("user");
            setUser(null);
        }

        setLoading(false);
    }, []);

    async function login({ email, password }) {
        const { data } = await http.post("/auth/login", {
            email,
            password,
        });

        if (!data?.token) {
            throw new Error("Token ausente na resposta da API.");
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
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    const value = useMemo(
        () => ({
            token,
            user,
            loading,
            login,
            logout,
        }),
        [token, user, loading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
