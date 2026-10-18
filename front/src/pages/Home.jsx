
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="card">
            <h1>Sistema de Voluntários e Eventos do IFRS</h1>

            <p>
                Bem-vindo ao sistema de gerenciamento de voluntários e eventos
                do IFRS!
            </p>

            <p>
                Acesse sua conta para consultar as funcionalidades disponíveis.
            </p>

            <Link to="/login" className="button">
                Fazer login
            </Link>
        </section>
    );
}
