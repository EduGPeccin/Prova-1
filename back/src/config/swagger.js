
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API de Voluntariado IFRS",
      version: "1.0.0",
      description:
        "Documentação da API de gerenciamento de voluntários e eventos.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    tags: [
      { name: "Eventos", description: "Gerenciamento de eventos" },
      { name: "Autenticação", description: "Login de usuários" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Evento: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            titulo: { type: "string", example: "Ação Solidária" },
            descricao: {
              type: "string",
              example: "Atividade de voluntariado comunitário",
            },
            data_evento: {
              type: "string",
              format: "date-time",
              example: "2026-11-20 09:00:00",
            },
            local: { type: "string", example: "IFRS" },
            horario: { type: "string", example: "09:00:00" },
            vagas: { type: "integer", example: 30 },
            status: { type: "string", example: "Planejado" },
          },
        },
        NovoEvento: {
          type: "object",
          required: [
            "titulo",
            "descricao",
            "data_evento",
            "local",
            "horario",
            "vagas",
            "status",
          ],
          properties: {
            titulo: { type: "string", example: "Ação Solidária" },
            descricao: {
              type: "string",
              example: "Atividade de voluntariado comunitário",
            },
            data_evento: {
              type: "string",
              example: "2026-11-20 09:00:00",
            },
            local: { type: "string", example: "IFRS" },
            horario: { type: "string", example: "09:00:00" },
            vagas: { type: "integer", minimum: 0, example: 30 },
            status: { type: "string", example: "Planejado" },
          },
        },
        CredenciaisLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@ifrs.edu.br",
            },
            password: {
              type: "string",
              format: "password",
              example: "admin123",
            },
          },
        },
        RespostaLogin: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIs...",
            },
            user: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                nome: { type: "string", example: "Administrador" },
                email: {
                  type: "string",
                  format: "email",
                  example: "admin@ifrs.edu.br",
                },
                role: { type: "string", example: "admin" },
              },
            },
          },
        },
      },
    },
    paths: {
      "/protected/events": {
        get: {
          tags: ["Eventos"],
          summary: "Listar eventos",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Eventos retornados com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Evento" },
                  },
                },
              },
            },
            401: { description: "Token ausente ou expirado." },
            403: { description: "Token inválido ou acesso negado." },
            500: { description: "Erro interno do servidor." },
          },
        },
        post: {
          tags: ["Eventos"],
          summary: "Cadastrar evento",
          description: "Requer autenticação e perfil administrador.",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/NovoEvento" },
              },
            },
          },
          responses: {
            201: { description: "Evento cadastrado com sucesso." },
            400: { description: "Dados inválidos." },
            401: { description: "Token ausente ou expirado." },
            403: { description: "Apenas administradores podem cadastrar." },
            500: { description: "Erro interno do servidor." },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Autenticação"],
          summary: "Realizar login",
          description: "Autentica o usuário e retorna um token JWT.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CredenciaisLogin",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login realizado com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/RespostaLogin",
                  },
                },
              },
            },
            401: { description: "E-mail ou senha inválidos." },
            500: { description: "Erro interno do servidor." },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
