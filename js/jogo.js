const container = document.getElementById("detalhes-container");
const API_KEY = "c46d0f85532b4ec6a3944b6377b828e5"; // Substitua pela sua chave da API RAWG

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

if (!gameId) {
  container.innerHTML = "<p>ID do jogo não encontrado na URL.</p>";
} else {
  carregarDetalhes(gameId);
}

async function carregarDetalhes(id) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const data = await response.json();

    const nome = data.name;
    const imagem = data.background_image;
    const descricao = data.description_raw;
    const nota = data.rating;
    const classificacao = data.esrb_rating?.name || "Não informada";
    const generos = data.genres.map(g => g.name).join(", ") || "Não disponível";
    const plataformas = data.platforms.map(p => p.platform.name).join(", ") || "Não disponível";

    container.innerHTML = `
      <h1>${nome}</h1>
      <img src="${imagem}" alt="${nome}" />
      <p><strong>Nota:</strong> ${nota} / 5</p>
      <p><strong>Classificação:</strong> ${classificacao}</p>
      <p><strong>Plataformas:</strong> ${plataformas}</p>
      <p><strong>Gêneros:</strong> ${generos}</p>
      <p><strong>Descrição:</strong> ${descricao}</p>
      <a href="/html/playnium.html">⬅️ Voltar</a>
    `;
  } catch (error) {
    console.error("Erro ao carregar detalhes do jogo:", error);
    container.innerHTML = "<p>Erro ao carregar os detalhes do jogo.</p>";
  }
}
