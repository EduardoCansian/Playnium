import { buscarDetalhesDoJogo } from "../api.js";

class CardGame {  

  constructor(Imagem, Nome, Nota, Classificacao, Plataforma, Id) {
    this.Imagem = Imagem;
    this.Nome = Nome;
    this.Nota = Nota;
    this.Classificacao = Classificacao;
    this.Plataforma = Plataforma;
    this.Id = Id;
  }

  async CriarCard(container) {
    const gameElement = document.createElement("li");
    gameElement.className = "game";

    const idDescricao = `desc-${this.Id}`;

    gameElement.innerHTML = `
      <img src="${this.Imagem}" alt="${this.Nome}">
      <div class="game-info">
        <h2>${this.Nome}</h2>
        <p><strong>Nota:</strong> ${this.Nota} / 5</p>
        <p><strong>Classificação:</strong> ${this.Classificacao}</p>
        <p><strong>Plataformas:</strong> ${this.Plataforma}</p>
        <p id="${idDescricao}"><strong>Descrição:</strong> Carregando...</p>
      </div>
    `;

    container.appendChild(gameElement);

    try {
      const descricao = await buscarDetalhesDoJogo(this.Id);
      const descricaoElement = document.getElementById(idDescricao);

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
      console.error("Erro ao buscar descrição:", err);
      const descricaoElement = document.getElementById(idDescricao);
      if (descricaoElement) {
        descricaoElement.innerHTML = `<strong>Descrição:</strong> Não disponível`;
      }
    }
  }
}

export default CardGame;
