
import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Dashboard() {
  const [msg, setMsg] = useState("Carregando...");

  useEffect(() => {
    let ativo = true;

    http
      .get("/protected/dashboard")
      .then(({ data }) => {
        if (ativo) {
          setMsg(data.message || "Bem-vindo ao painel!");
        }
      })
      .catch((error) => {
        if (!ativo) return;

        if (error.response?.status === 401 ||
            error.response?.status === 403) {
          setMsg("Sua sessão expirou ou não é válida. Faça login novamente.");
        } else {
          setMsg("Erro ao carregar o painel. Tente novamente.");
        }
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <section className="card">
      <h1>Dashboard</h1>
      <p>{msg}</p>
    </section>
  );
}
