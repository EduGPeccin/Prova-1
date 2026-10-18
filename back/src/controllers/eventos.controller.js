
const EventosModel = require("../models/eventosModel");

/**
 * Controller responsável pelas operações de eventos.
 */
class EventosController {
  /**
   * Lista todos os eventos.
   */
  static async listar(req, res) {
    try {
      const eventos = await EventosModel.findAll();

      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar eventos.",
        error: error.message,
      });
    }
  }

  /**
   * Busca um evento pelo ID.
   */
  static async buscarPorId(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const evento = await EventosModel.findById(id);

      if (!evento) {
        return res.status(404).json({
          message: "Evento não encontrado.",
        });
      }

      return res.status(200).json(evento);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar evento.",
        error: error.message,
      });
    }
  }

  /**
   * Cria um novo evento.
   */
  static async criar(req, res) {
    try {
      const { titulo, descricao, data_evento, local, horario, vagas, status } = req.body;

      if (
        !titulo ||
        !descricao ||
        !data_evento ||
        !local ||
        !horario ||
        vagas === undefined ||
        vagas === null ||
        !status
      ) {
        return res.status(400).json({
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      if (!Number.isInteger(Number(vagas)) || Number(vagas) < 0) {
        return res.status(400).json({
          message: "O número de vagas deve ser um inteiro não negativo.",
        });
      }

      const id = await EventosModel.create({
        titulo,
        descricao,
        data_evento,
        local,
        horario,
        vagas: Number(vagas),
        status,
      });

      return res.status(201).json({
        message: "Evento criado com sucesso.",
        id,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar evento.",
        error: error.message,
      });
    }
  }

  /**
   * Altera os dados de um evento.
   */
  static async alterar(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const { titulo, descricao, data_evento, local, horario, vagas, status } = req.body;

      if (
        !titulo ||
        !descricao ||
        !data_evento ||
        !local ||
        !horario ||
        vagas === undefined ||
        vagas === null ||
        !status
      ) {
        return res.status(400).json({
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      if (!Number.isInteger(Number(vagas)) || Number(vagas) < 0) {
        return res.status(400).json({
          message: "O número de vagas deve ser um inteiro não negativo.",
        });
      }

      const eventoExistente = await EventosModel.findById(id);

      if (!eventoExistente) {
        return res.status(404).json({
          message: "Evento não encontrado.",
        });
      }

      await EventosModel.update(id, {
        titulo,
        descricao,
        data_evento,
        local,
        horario,
        vagas: Number(vagas),
        status,
      });

      return res.status(200).json({
        message: "Evento atualizado com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar evento.",
        error: error.message,
      });
    }
  }

  /**
   * Exclui um evento.
   */
  static async excluir(req, res) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          message: "ID inválido.",
        });
      }

      const evento = await EventosModel.findById(id);

      if (!evento) {
        return res.status(404).json({
          message: "Evento não encontrado.",
        });
      }

      await EventosModel.delete(id);

      return res.status(200).json({
        message: "Evento excluído com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao excluir evento.",
        error: error.message,
      });
    }
  }
}

module.exports = EventosController;
