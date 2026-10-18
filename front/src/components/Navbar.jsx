import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Voluntariado IFRS
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          {token && (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/voluntarios">Voluntários</NavLink>
              </li>
              <li>
                <NavLink to="/eventos">Eventos</NavLink>
              </li>
            </>
          )}

          {token && user?.role === "admin" && (
            <li>
              <NavLink to="/admin">Administração</NavLink>
            </li>
          )}

          {!token ? (
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
          ) : (
            <li>
              <button
                type="button"
                className="btn"
                onClick={logout}
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}