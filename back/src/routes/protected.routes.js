
const express = require("express");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/auth.middleware");

const ProtectedController = require("../controllers/protected.controller");
const VoluntariosController = require("../controllers/voluntarios.controller");
const EventosController = require("../controllers/eventos.controller");

const router = express.Router();

// Painel para usuários autenticados
router.get(
  "/dashboard",
  authenticateToken,
  ProtectedController.dashboard
);

// Área exclusiva para administradores
router.get(
  "/admin",
  authenticateToken,
  authorizeRole("admin"),
  ProtectedController.adminOnly
);

// ==============================
// ROTAS DE VOLUNTÁRIOS
// ==============================

// Listar voluntários
router.get(
  "/voluntarios",
  authenticateToken,
  VoluntariosController.listar
);

// Buscar voluntário por ID
router.get(
  "/voluntarios/:id",
  authenticateToken,
  VoluntariosController.buscarPorId
);

// Alterar voluntário
router.put(
  "/voluntarios/:id",
  authenticateToken,
  authorizeRole("admin"),
  VoluntariosController.alterar
);

// Excluir voluntário
router.delete(
  "/voluntarios/:id",
  authenticateToken,
  authorizeRole("admin"),
  VoluntariosController.excluir
);

// ==============================
// ROTAS DE EVENTOS
// ==============================

// Listar eventos
router.get(
  "/events",
  authenticateToken,
  EventosController.listar
);

// Buscar evento por ID
router.get(
  "/events/:id",
  authenticateToken,
  EventosController.buscarPorId
);

// Criar evento (somente administrador)
router.post(
  "/events",
  authenticateToken,
  authorizeRole("admin"),
  EventosController.criar
);

// Alterar evento (somente administrador)
router.put(
  "/events/:id",
  authenticateToken,
  authorizeRole("admin"),
  EventosController.alterar
);

// Excluir evento (somente administrador)
router.delete(
  "/events/:id",
  authenticateToken,
  authorizeRole("admin"),
  EventosController.excluir
);

module.exports = router;
