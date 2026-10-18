
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Informe o token JWT recebido no login.",
        },
      },
      schemas: {
        Evento: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            nome: {
              type: "string",
              example: "Oficina de Excel",
            },
            descricao: {
              type: "string",
              example: "Oficina básica de Excel para a comunidade.",
            },
            data: {
              type: "string",
              format: "date",
              example: "2026-11-20",
            },
            local: {
              type: "string",
              example: "Campus IFRS",
            },
            vagas: {
              type: "integer",
              example: 30,
            },
            status: {
              type: "string",
              example: "Aberto",
            },
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
              example: "Senha123",
            },
          },
        },
      },
    },
    paths: {
      "/protected/events": {
        get: {
          summary: "Listar eventos",
          description: "Retorna os eventos cadastrados no sistema.",
          tags: ["Eventos"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Lista de eventos retornada com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Evento",
                    },
                  },
                },
              },
            },
            401: {
              description: "Token não informado ou expirado.",
            },
            403: {
              description: "Token inválido ou acesso negado.",
            },
            500: {
              description: "Erro interno do servidor.",
            },
          },
        },
        post: {
          summary: "Cadastrar evento",
          description: "Cria um novo evento. Requer perfil administrador.",
          tags: ["Eventos"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "nome",
                    "descricao",
                    "data",
                    "local",
                    "vagas",
                    "status",
                  ],
                  properties: {
                    nome: {
                      type: "string",
                      example: "Oficina de Excel",
                    },
                    descricao: {
                      type: "string",
                      example: "Oficina básica de Excel.",
                    },
                    data: {
                      type: "string",
                      format: "date",
                      example: "2026-11-20",
                    },
                    local: {
                      type: "string",
                      example: "Campus IFRS",
                    },
                    vagas: {
                      type: "integer",
                      example: 30,
                    },
                    status: {
                      type: "string",
                      example: "Aberto",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Evento cadastrado com sucesso.",
            },
            400: {
              description: "Dados inválidos.",
            },
            401: {
              description: "Token não informado ou expirado.",
            },
            403: {
              description: "Apenas administradores podem cadastrar eventos.",
            },
            500: {
              description: "Erro interno do servidor.",
            },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Realizar login",
          description: "Autentica o usuário e retorna um token JWT.",
          tags: ["Autenticação"],
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
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIs...",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            example: 1,
                          },
                          nome: {
                            type: "string",
                            example: "Administrador",
                          },
                          email: {
                            type: "string",
                            example: "admin@ifrs.edu.br",
                          },
                          role: {
                            type: "string",
                            example: "admin",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "E-mail ou senha inválidos.",
            },
            500: {
              description: "Erro interno do servidor.",
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
