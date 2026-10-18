// Controlador responsável por lidar com rotas Voluntários da aplicação
class PublicController {
  // Método que responde à rota Voluntários inicial
  static home(req, res) {
    try {
      // Envia uma mensagem de boas-vindas sem exigir autenticação
      return res.status(200).send("Bem-vindo à API Voluntários!");
    } catch (error) {
      // Em caso de erro inesperado, retorna status 500 com a mensagem do erro
      return res.status(500).json({
        message: "Erro ao acessar a rota Voluntários",
        error: error.message,
      });
    }
  }
}
// Exporta o controlador para ser utilizado nas rotas Voluntários
module.exports = PublicController;
