import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../auth/AuthContext";

const formularioInicial = {
  nome: "",
  email: "",
  telefone: "",
  curso: "",
};

export default function Voluntarios() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [voluntarios, setVoluntarios] = useState([]);
  const [form, setForm] = useState({ ...formularioInicial });
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  // Carrega os voluntários ao abrir a página.
  useEffect(() => {
    let ativo = true;

    async function buscarVoluntarios() {
      try {
        const { data } = await http.get("/protected/voluntarios");

        if (ativo) {
          setVoluntarios(
            Array.isArray(data)
              ? data
              : data.voluntarios ?? []
          );
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.message ||
              "Não foi possível carregar os voluntários."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    buscarVoluntarios();

    return () => {
      ativo = false;
    };
  }, []);

  // Atualiza a lista depois de editar ou excluir.
  async function atualizarLista() {
    setCarregando(true);
    setErro("");

    try {
      const { data } = await http.get("/protected/voluntarios");

      setVoluntarios(
        Array.isArray(data)
          ? data
          : data.voluntarios ?? []
      );
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível atualizar a lista de voluntários."
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

  function iniciarEdicao(voluntario) {
    setEditando(voluntario.id);

    setForm({
      nome: voluntario.nome ?? "",
      email: voluntario.email ?? "",
      telefone: voluntario.telefone ?? "",
      curso: voluntario.curso ?? "",
    });

    setMensagem("");
    setErro("");
  }

  function cancelarEdicao() {
    setEditando(null);
    setForm({ ...formularioInicial });
  }

  async function salvarEdicao(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    try {
      await http.put(
        `/protected/voluntarios/${editando}`,
        form
      );

      setMensagem("Voluntário atualizado com sucesso.");
      cancelarEdicao();

      await atualizarLista();
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível atualizar o voluntário."
      );
    }
  }

  async function excluirVoluntario(id) {
    if (
      !window.confirm(
        "Deseja realmente excluir este voluntário?"
      )
    ) {
      return;
    }

    setMensagem("");
    setErro("");

    try {
      await http.delete(`/protected/voluntarios/${id}`);

      setMensagem("Voluntário excluído com sucesso.");

      if (editando === id) {
        cancelarEdicao();
      }

      await atualizarLista();
    } catch (error) {
      setErro(
        error.response?.data?.message ||
          "Não foi possível excluir o voluntário."
      );
    }
  }

  return (
    <section className="card">
      <h1>Voluntários</h1>
      <p>Consulte os voluntários cadastrados no sistema.</p>

      {mensagem && <p role="status">{mensagem}</p>}

      {erro && (
        <p className="alert" role="alert">
          {erro}
        </p>
      )}

      {editando !== null && (
        <form onSubmit={salvarEdicao} className="form">
          <h2>Editar voluntário</h2>

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
            E-mail
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Telefone
            <input
              name="telefone"
              value={form.telefone}
              onChange={atualizarCampo}
              required
            />
          </label>

          <label>
            Curso
            <input
              name="curso"
              value={form.curso}
              onChange={atualizarCampo}
              required
            />
          </label>

          <button type="submit" disabled={carregando}>
            Salvar alterações
          </button>

          <button type="button" onClick={cancelarEdicao}>
            Cancelar
          </button>
        </form>
      )}

      <hr />

      <h2>Lista de voluntários</h2>

      {carregando ? (
        <p>Carregando voluntários...</p>
      ) : voluntarios.length === 0 ? (
        <p>Nenhum voluntário encontrado.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Curso</th>
                {isAdmin && <th>Ações</th>}
              </tr>
            </thead>

            <tbody>
              {voluntarios.map((voluntario) => (
                <tr key={voluntario.id}>
                  <td>{voluntario.nome}</td>
                  <td>{voluntario.email}</td>
                  <td>{voluntario.telefone}</td>
                  <td>{voluntario.curso}</td>

                  {isAdmin && (
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          iniciarEdicao(voluntario)
                        }
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          excluirVoluntario(voluntario.id)
                        }
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