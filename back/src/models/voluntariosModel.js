
const db = require("../config/database");

/**
 * Model responsável pelo acesso à tabela `voluntarios` no MySQL.
 *
 * Centraliza as operações de consulta, criação, atualização e exclusão
 * de registros de voluntários.
 *
 * @class VoluntariosModel
 */
class VoluntariosModel {
  /**
   * Lista todos os voluntários cadastrados.
   *
   * @async
   * @static
   * @returns {Promise<Array<Object>>} Lista de voluntários.
   */
  static async findAll() {
    const [rows] = await db.query(
      `SELECT id, nome, email, role, telefone, curso
       FROM voluntarios
       ORDER BY id DESC`
    );

    return rows;
  }

  /**
   * Busca um voluntário pelo ID.
   *
   * @async
   * @static
   * @param {number} id - O ID do voluntário a ser buscado.
   * @returns {Promise<Object|null>} O voluntário encontrado ou null se não encontrado.
   */
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT id, nome, email, role, telefone, curso
       FROM voluntarios
       WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  /**
   * Busca um voluntário pelo e-mail.
   *
   * @async
   * @static
   * @param {string} email - O e-mail do voluntário a ser buscado.
   * @returns {Promise<Object|null>} O voluntário encontrado ou null se não encontrado.
   */
  static async findByEmail(email) {
    const [rows] = await db.query(
      "SELECT * FROM voluntarios WHERE email = ?",
      [email]
    );

    return rows[0];
  }


  /**
   * Altera os dados de um voluntário.
   *
   * @async
   * @static
   * @param {number} id - O ID do voluntário a ser atualizado.
   * @param {Object} voluntario - Os novos dados do voluntário.
   * @returns {Promise<boolean>} true se o voluntário foi atualizado, false caso contrário.
   */
  static async update(id, voluntario) {
    const { nome, email, telefone, curso } = voluntario;

    const [result] = await db.query(
      `UPDATE voluntarios
       SET nome = ?, email = ?, telefone = ?, curso = ?
       WHERE id = ?`,
      [nome, email, telefone, curso, id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Exclui um voluntário pelo ID.
   *
   * @async
   * @static
   * @param {number} id - O ID do voluntário a ser excluído.
   * @returns {Promise<boolean>} true se o voluntário foi excluído, false caso contrário.
   */
  static async delete(id) {
    const [result] = await db.query(
      "DELETE FROM voluntarios WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = VoluntariosModel;
