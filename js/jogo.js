const container = document.getElementById("detalhes-container");  // Seleciona o conteiner onde os detalhes dos jogos serão exibidos
const API_KEY = "c46d0f85532b4ec6a3944b6377b828e5";     //Chave da API RAWG

const urlParams = new URLSearchParams(window.location.search);  // Pega os parâmetros da URL
const gameId = urlParams.get("id");

// Verifica se o ID do jogo está presente na URL
if (!gameId) {
  container.innerHTML = "<p>ID do jogo não encontrado na URL.</p>";
} else {
  carregarDetalhes(gameId);
}

// Função assíncrona que busca os detalhes do jogo pelo ID e renderiza na página
async function carregarDetalhes(id) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);   // Faz a requisição à API para obter os dados do jogo
    const data = await response.json();   //Converte a resposta em JSON

    // Extrai as informações principais do jogo
    const nome = data.name;
    const imagem = data.background_image;
    const descricao = data.description_raw;
    const nota = data.rating;
    const classificacao = data.esrb_rating?.name || "Não informada";
    const generos = data.genres.map(g => g.name).join(", ") || "Não disponível";
    const plataformas = data.platforms.map(p => p.platform.name).join(", ") || "Não disponível";

    // Insere as informações no container em formato HTML
    container.innerHTML = `
      <h1>${nome}</h1>
      <img src="${imagem}" alt="${nome}" />
      <p><strong>Nota:</strong> ${nota} / 5</p>
      <p><strong>Classificação:</strong> ${classificacao}</p>
      <p><strong>Plataformas:</strong> ${plataformas}</p>
      <p><strong>Gêneros:</strong> ${generos}</p>
      <p><strong>Descrição:</strong> ${descricao}</p>
      <a href="./playnium.html">⬅️ Voltar</a>
    `;
  } catch (error) {
    // Em caso de erro, exibe mensagem ao usuário
    console.error("Erro ao carregar detalhes do jogo:", error);
    container.innerHTML = "<p>Erro ao carregar os detalhes do jogo.</p>";
  }
}
