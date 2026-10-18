
const db = require("../config/database");

/**
 * Model responsável pelo acesso à tabela voluntarios.
 */
class VoluntariosModel {
  /**
   * Lista todos os voluntários.
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
