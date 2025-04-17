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
    const idGeneros = `generos-${this.Id}`;

    gameElement.innerHTML = `
      <img src="${this.Imagem}" alt="${this.Nome}">
      <div class="game-info">
        <h2>${this.Nome}</h2>
        <p><strong>Nota:</strong> ${this.Nota} / 5</p>
        <p><strong>Classificação:</strong> ${this.Classificacao}</p>
        <p><strong>Plataformas:</strong> ${this.Plataforma}</p>
        <p id="${idGeneros}"><strong>Gêneros:</strong> Carregando...</p>
        <p id="${idDescricao}"><strong>Descrição:</strong> Carregando...</p>
      </div>
    `;

    container.appendChild(gameElement);

    try {
      const detalhes = await buscarDetalhesDoJogo(this.Id);
      const descricaoElement = document.getElementById(idDescricao);
      const generosElement = document.getElementById(idGeneros);

      // Preenche os gêneros
      if (detalhes.generos && detalhes.generos.length > 0) {
        generosElement.innerHTML = `<strong>Gêneros:</strong> ${detalhes.generos.join(", ")}`;
      } else {
        generosElement.innerHTML = `<strong>Gêneros:</strong> Não disponível`;
      }

      // Preenche a descrição
      const descricao = detalhes.descricao;
      if (descricao.length > 100) {
        const resumo = descricao.slice(0, 100) + "...";
        const botao = document.createElement("button");
        botao.textContent = "Ler mais";
        botao.classList.add("ler-mais-btn");

        let expandido = false;

        botao.addEventListener("click", (event) => {
          event.stopPropagation(); // evita que o clique no botão acione o clique no card
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
      console.error("Erro ao buscar detalhes:", err);
      document.getElementById(idDescricao).innerHTML = `<strong>Descrição:</strong> Não disponível`;
      document.getElementById(idGeneros).innerHTML = `<strong>Gêneros:</strong> Não disponível`;
    }

    // Evento de clique no card
    gameElement.addEventListener("click", () => {
      window.location.href = `jogo.html?id=${this.Id}`;
    });
  }
}

export default CardGame;
