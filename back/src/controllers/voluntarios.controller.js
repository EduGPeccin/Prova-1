const VoluntariosModel = require("../models/VoluntariosModel");

/**
 * Controller responsável pelas operações de voluntários.
 */
class VoluntariosController {
  /**
   * Lista todos os voluntários.
   */
  static async listar(req, res) {
    try {
      const voluntarios = await VoluntariosModel.findAll();

      return res.status(200).json(voluntarios);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar voluntários.",
        error: error.message,
      });
    }
  }

  /**
   * Busca um voluntário pelo ID.
   */
  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const voluntario = await VoluntariosModel.findById(Number(id));

      if (!voluntario) {
        return res.status(404).json({
          message: "Voluntário não encontrado.",
        });
      }

      return res.status(200).json(voluntario);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar voluntário.",
        error: error.message,
      });
    }
  }

  /**
   * Altera os dados de um voluntário.
   */
  static async alterar(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const { nome, email, telefone, curso } = req.body;

      if (!nome || !email || !telefone || !curso) {
        return res.status(400).json({
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const voluntario = await VoluntariosModel.findById(id);

      if (!voluntario) {
        return res.status(404).json({
          message: "Voluntário não encontrado.",
        });
      }

      const emailExistente = await VoluntariosModel.findByEmail(email);

      if (emailExistente && Number(emailExistente.id) !== id) {
        return res.status(409).json({
          message: "Este e-mail já está cadastrado.",
        });
      }

      await VoluntariosModel.update(id, {
        nome,
        email,
        telefone,
        curso,
      });

      return res.status(200).json({
        message: "Voluntário atualizado com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar voluntário.",
        error: error.message,
      });
    }
  }

  /**
   * Exclui um voluntário.
   */
  static async excluir(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const voluntario = await VoluntariosModel.findById(id);

      if (!voluntario) {
        return res.status(404).json({
          message: "Voluntário não encontrado.",
        });
      }

      await VoluntariosModel.delete(id);

      return res.status(200).json({
        message: "Voluntário excluído com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao excluir voluntário.",
        error: error.message,
      });
    }
  }
}

module.exports = VoluntariosController;
