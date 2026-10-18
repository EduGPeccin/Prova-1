
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ role, children }) {
    const { token, user, loading } = useAuth();

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
        return <Navigate to="/login" replace />;
    }

    // Sem usuário ou sem a permissão exigida
    if (!user || user.role !== role) {
        return <Navigate to="/forbidden" replace />;
    }

    // Permite o acesso
    return children;
}
