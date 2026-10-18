import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../auth/AuthContext";

const formularioInicial = {
  nome: "",
  descricao: "",
  data: "",
  local: "",
  vagas: 1,
  status: "Aberto",
};

export default function Eventos() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // Carrega os eventos ao abrir a página.
  useEffect(() => {
    let ativo = true;

    async function buscarEventos() {
      try {
        const { data } = await http.get("/protected/events");

        if (ativo) {
          setEventos(
            Array.isArray(data) ? data : data.eventos ?? []
          );
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.message ||
              "Não foi possível carregar os eventos."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    buscarEventos();

    return () => {
      ativo = false;
    };
  }, []);

  // Atualiza a lista após cadastrar, editar ou excluir.
  async function atualizarLista() {
    setCarregando(true);
    setErro("");

    try {
      const { data } = await http.get("/protected/events");

      setEventos(
        Array.isArray(data) ? data : data.eventos ?? []
      );
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível atualizar a lista de eventos."
      );
    } finally {
      setCarregando(false);
    }
  }

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setForm((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function limparFormulario() {
    setForm({ ...formularioInicial });
    setEditando(null);
  }

  function iniciarEdicao(evento) {
    setEditando(evento.id);

    setForm({
      nome: evento.nome ?? "",
      descricao: evento.descricao ?? "",
      data: evento.data
        ? String(evento.data).slice(0, 10)
        : "",
      local: evento.local ?? "",
      vagas: evento.vagas ?? 1,
      status: evento.status ?? "Aberto",
    });

    setMensagem("");
    setErro("");
  }

  async function salvarEvento(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    const dados = {
      ...form,
      vagas: Number(form.vagas),
    };

    try {
      if (editando !== null) {
        await http.put(`/protected/events/${editando}`, dados);
        setMensagem("Evento atualizado com sucesso.");
      } else {
        await http.post("/protected/events", dados);
        setMensagem("Evento cadastrado com sucesso.");
      }

      limparFormulario();
      await atualizarLista();
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível salvar o evento."
      );
    }
  }

  async function excluirEvento(id) {
    if (!window.confirm("Deseja realmente excluir este evento?")) {
      return;
    }

    setMensagem("");
    setErro("");

    try {
      await http.delete(`/protected/events/${id}`);
      setMensagem("Evento excluído com sucesso.");

      if (editando === id) {
        limparFormulario();
      }

      await atualizarLista();
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível excluir o evento."
      );
    }
  }

  return (
    <section className="card">
      <h1>Eventos</h1>
      <p>Consulte os eventos disponíveis no sistema.</p>

      {mensagem && <p role="status">{mensagem}</p>}

      {erro && (
        <p className="alert" role="alert">
          {erro}
        </p>
      )}

      {isAdmin && (
        <form onSubmit={salvarEvento} className="form">
          <h2>
            {editando !== null
              ? "Editar evento"
              : "Cadastrar evento"}
          </h2>

          <label>
            Nome
            <input
              name="nome"
              value={form.nome}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Data
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Local
            <input
              name="local"
              value={form.local}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Vagas
            <input
              type="number"
              name="vagas"
              min="0"
              value={form.vagas}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={form.status}
              onChange={atualizarCampo}
              required
            >
              <option value="Aberto">Aberto</option>
              <option value="Encerrado">Encerrado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </label>

          <button type="submit" disabled={carregando}>
            {editando !== null
              ? "Salvar alterações"
              : "Cadastrar evento"}
          </button>

          {editando !== null && (
            <button type="button" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </form>
      )}

      <hr />

      <h2>Lista de eventos</h2>

      {carregando ? (
        <p>Carregando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Local</th>
                <th>Vagas</th>
                <th>Status</th>
                {isAdmin && <th>Ações</th>}
              </tr>
            </thead>

            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.nome}</td>
                  <td>
                    {evento.data
                      ? String(evento.data).slice(0, 10)
                      : "—"}
                  </td>
                  <td>{evento.local}</td>
                  <td>{evento.vagas}</td>
                  <td>{evento.status}</td>

                  {isAdmin && (
                    <td>
                      <button
                        type="button"
                        onClick={() => iniciarEdicao(evento)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirEvento(evento.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}