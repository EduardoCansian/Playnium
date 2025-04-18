// Importa a classe CardGame, responsável por criar os cartões dos jogos
import CardGame from "./Objetos/CardGames.js";

// Função assíncrona para renderizar os jogos na tela
export async function renderizarJogos(jogos) {
  const container = document.getElementById("games-container");   //Container onde os jogos serão exibidos
  container.innerHTML = "";

  // Caso não haja jogos, exibe uma mensagem e encerra a função
  if (!jogos.length) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  // Percorre a lista de jogos e cria um card para cada um
  for (const jogo of jogos) {
    const card = new CardGame(
      jogo.background_image,  // Imagem de fundo do jogo
      jogo.name,  // Nome do jogo
      jogo.rating,  //Nota do jogo
      jogo.esrb_rating?.name || "Não informado",  //Classificação indicativa
      jogo.platforms?.map(p => p.platform.name).join(", ") || "N/A",  //PLataformas disponíveis
      jogo.id   // Id do jogo
    );

    await card.CriarCard(container);  // Cria o card e o adiciona ao container

  }
}
