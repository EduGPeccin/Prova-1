
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
    const { token, loading } = useAuth();
    const location = useLocation();

    // Aguarda a restauração da sessão
    if (loading) {
        return (
            <div style={{ padding: 24 }}>
                <p>Carregando sessão...</p>
            </div>
        );
    }

    // Sem token: redireciona para o login
    if (!token) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Com token armazenado: permite renderizar a página
    return children;
}
