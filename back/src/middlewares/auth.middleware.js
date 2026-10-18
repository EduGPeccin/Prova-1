
const jwt = require("jsonwebtoken");

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization foi enviado
  if (!authHeader) {
    return res.status(401).json({
      message: "Token de autenticação não informado.",
    });
  }

  // Verifica o formato: Bearer <token>
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Formato do token inválido. Use: Bearer <token>.",
    });
  }

  // Verifica se a chave secreta está configurada
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET não está configurado no arquivo .env.");

    return res.status(500).json({
      message: "Erro interno de configuração da autenticação.",
    });
  }

  // Valida o token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expirado. Faça login novamente.",
        });
      }

      return res.status(403).json({
        message: "Token inválido.",
      });
    }

    // Disponibiliza os dados do usuário autenticado
    req.voluntarios = decoded;

    next();
  });
}

// Middleware para autorizar usuários por função (role)
function authorizeRole(role) {
  return (req, res, next) => {
    // Confere se o usuário foi autenticado
    if (!req.voluntarios) {
      return res.status(401).json({
        message: "Usuário não autenticado.",
      });
    }

    // Confere se a função exigida corresponde à do usuário
    if (req.voluntarios.role !== role) {
      return res.status(403).json({
        message: "Acesso negado. Permissão insuficiente.",
      });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};
