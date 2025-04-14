import CardGame from "./Objetos/CardGames.js";

export async function renderizarJogos(jogos) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  if (!jogos.length) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  for (const jogo of jogos) {
    const card = new CardGame(
      jogo.background_image,
      jogo.name,
      jogo.rating,
      jogo.esrb_rating?.name || "Não informado",
      jogo.platforms?.map(p => p.platform.name).join(", ") || "N/A",
      jogo.id
    );

    await card.CriarCard(container);
  
  }
}
