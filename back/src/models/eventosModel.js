
const db = require("../config/database");

/**
 * Model responsável pelo acesso à tabela eventos no MySQL.
 */
class EventosModel {
  /**
   * Lista todos os eventos.
   * @returns {Promise<Array>} Lista de eventos.
   */
  static async findAll() {
    const [rows] = await db.query(
      "SELECT * FROM eventos ORDER BY id DESC"
    );

    return rows;
  }

  /**
   * Busca um evento pelo ID.
   * @param {number} id - ID do evento.
   * @returns {Promise<Object|undefined>} Evento encontrado ou undefined.
   */
  static async findById(id) {
    const [rows] = await db.query(
      "SELECT * FROM eventos WHERE id = ?",
      [id]
    );

    return rows[0];
  }

  /**
   * Cria um novo evento.
   * @param {Object} evento - Dados do evento.
   * @returns {Promise<number>} ID do evento criado.
   */
  static async create(evento) {
    const {
      titulo,
      descricao,
      data_evento,
      local,
      horario,
      vagas,
      status,
    } = evento;

    const [result] = await db.query(
      `INSERT INTO eventos
        (titulo, descricao, data_evento, local, horario, vagas, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descricao, data_evento, local, horario, vagas, status]
    );

    return result.insertId;
  }

  /**
   * Atualiza os dados de um evento.
   * @param {number} id - ID do evento.
   * @param {Object} evento - Novos dados do evento.
   * @returns {Promise<boolean>} Indica se um registro foi alterado.
   */
  static async update(id, evento) {
    const {
      titulo,
      descricao,
      data_evento,
      local,
      horario,
      vagas,
      status,
    } = evento;

    const [result] = await db.query(
      `UPDATE eventos
       SET titulo = ?,
           descricao = ?,
           data_evento = ?,
           local = ?,
           horario = ?,
           vagas = ?,
           status = ?
       WHERE id = ?`,
      [titulo, descricao, data_evento, local, horario, vagas, status, id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Exclui um evento pelo ID.
   * @param {number} id - ID do evento.
   * @returns {Promise<boolean>} Indica se um registro foi excluído.
   */
  static async delete(id) {
    const [result] = await db.query(
      "DELETE FROM eventos WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = EventosModel;
