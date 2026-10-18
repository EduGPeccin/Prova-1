
import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Admin() {
    const [msg, setMsg] = useState("Carregando...");

    useEffect(() => {
        let ativo = true;

        http
            .get("/protected/admin")
            .then(({ data }) => {
                if (ativo) {
                    setMsg(data.message || "Bem-vindo à área administrativa!");
                }
            })
            .catch((error) => {
                if (!ativo) return;

                if (error.response?.status === 401) {
                    setMsg("Sessão não autenticada. Faça login novamente.");
                } else if (error.response?.status === 403) {
                    setMsg("Acesso negado. Apenas administradores podem acessar esta área.");
                } else {
                    setMsg("Não foi possível carregar a área administrativa.");
                }
            });

        return () => {
            ativo = false;
        };
    }, []);

    return (
        <section className="card">
            <h1>Área Administrativa</h1>
            <p>{msg}</p>
        </section>
    );
}
