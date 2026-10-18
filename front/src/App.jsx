
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

import RootLayout from "./layouts/RootLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Voluntarios from "./pages/Voluntarios";
import Eventos from "./pages/Eventos";

function NotFound() {
  return (
    <main className="container">
      <h1>404 — Página não encontrada</h1>
      <p>Verifique a URL ou volte para a página inicial.</p>
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      // Rotas públicas
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "forbidden", element: <Forbidden /> },

      // Dashboard: exige autenticação
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },

      // Voluntários: consulta para usuários autenticados
      {
        path: "voluntarios",
        element: (
          <RequireAuth>
            <Voluntarios />
          </RequireAuth>
        ),
      },

      // Eventos: consulta para usuários autenticados
      {
        path: "eventos",
        element: (
          <RequireAuth>
            <Eventos />
          </RequireAuth>
        ),
      },

      // Área administrativa: exige papel admin
      {
        path: "admin",
        element: (
          <RequireAuth>
            <RequireRole role="admin">
              <Admin />
            </RequireRole>
          </RequireAuth>
        ),
      },

      // Página não encontrada
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
