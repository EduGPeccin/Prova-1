
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();

// Habilita o CORS
app.use(cors());

// Permite receber requisições JSON
app.use(express.json());

// Rotas da API
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);

module.exports = app;
