import { buscarDetalhesDoJogo } from "./api.js";

export async function renderizarJogos(jogos) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  if (!jogos.length) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  for (const jogo of jogos) {
    const gameElement = document.createElement("li");
    gameElement.className = "game";

    gameElement.innerHTML = `
      <img src="${jogo.background_image}" alt="${jogo.name}">
      <div class="game-info">
        <h2>${jogo.name}</h2>
        <p><strong>Nota:</strong> ${jogo.rating} / 5</p>
        <p><strong>Classificação:</strong> ${jogo.esrb_rating?.name || "Não informado"}</p>
        <p><strong>Plataformas:</strong> ${jogo.platforms?.map(p => p.platform.name).join(", ") || "N/A"}</p>
        <p id="desc-${jogo.id}"><strong>Descrição:</strong> Carregando...</p>
      </div>
    `;

    container.appendChild(gameElement);

    try {
      const descricao = await buscarDetalhesDoJogo(jogo.id);
      const descricaoElement = document.getElementById(`desc-${jogo.id}`);

      if (descricao.length > 100) {
        const resumo = descricao.slice(0, 100) + "...";
        const botao = document.createElement("button");
        botao.textContent = "Ler mais";
        botao.classList.add("ler-mais-btn");

        let expandido = false;

        botao.addEventListener("click", () => {
          expandido = !expandido;
          descricaoElement.innerHTML = `<strong>Descrição:</strong> ${expandido ? descricao : resumo}`;
          descricaoElement.appendChild(botao);
          botao.textContent = expandido ? "Mostrar menos" : "Ler mais";
        });

        descricaoElement.innerHTML = `<strong>Descrição:</strong> ${resumo}`;
        descricaoElement.appendChild(botao);
      } else {
        descricaoElement.innerHTML = `<strong>Descrição:</strong> ${descricao}`;
      }
    } catch (err) {
      document.getElementById(`desc-${jogo.id}`).innerHTML = `<strong>Descrição:</strong> Não disponível`;
    }
  }
}
