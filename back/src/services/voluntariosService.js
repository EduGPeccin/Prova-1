const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const VoluntariosModel = require("../models/voluntariosModel");

/**
 * Serviço responsável pelas regras de negócio dos usuários.
 */
class VoluntariosService {
  /**
   * Registra um novo usuário.
   * @param {Object} voluntarios - Dados do usuário.
   * @param {string} voluntarios.email - E-mail do usuário.
   * @param {string} voluntarios.password - Senha em texto puro.
   * @param {string} [voluntarios.role] - Perfil do usuário.
   * @returns {Promise<Object>} Mensagem e ID do usuário criado.
   */
  static async registerVoluntarios(voluntarios) {
    const { email, password } = voluntarios;

    if (!email || !password) {
      throw new Error("E-mail e senha são obrigatórios");
    }

    const existing = await VoluntariosModel.findByEmail(email);

    if (existing) {
      throw new Error("Voluntário já existe");
    }

    const hashed = await bcrypt.hash(password, 10);

    // Não permite que o usuário escolha ser administrador.
    const id = await VoluntariosModel.create({
      ...voluntarios,
      password: hashed,
      role: "user",
    });

    return {
      message: "Voluntário registrado com sucesso",
      id,
    };
  }

  /**
   * Autentica um usuário e gera um token JWT.
   * @param {Object} credentials - Credenciais de acesso.
   * @param {string} credentials.email - E-mail cadastrado.
   * @param {string} credentials.password - Senha informada.
   * @returns {Promise<Object>} Token e dados básicos do usuário.
   */
  static async loginVoluntarios({ email, password }) {
    if (!email || !password) {
      throw new Error("E-mail e senha são obrigatórios");
    }

    const voluntarios = await VoluntariosModel.findByEmail(email);

    if (!voluntarios) {
      throw new Error("E-mail ou senha inválidos");
    }

    const valid = await bcrypt.compare(password, voluntarios.password);

    if (!valid) {
      throw new Error("E-mail ou senha inválidos");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado");
    }

    const token = jwt.sign(
      {
        email: voluntarios.email,
        role: voluntarios.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return {
      token,
      usuario: {
        id: voluntarios.id,
        email: voluntarios.email,
        role: voluntarios.role,
      },
    };
  }
}

module.exports = VoluntariosService;
