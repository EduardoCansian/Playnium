// Importa a função que busca os detalhes de um jogo
import { buscarDetalhesDoJogo } from "../api.js";

// Classe que representa o card de um jogo
class CardGame {
  constructor(Imagem, Nome, Nota, Classificacao, Plataforma, Id) {
    this.Imagem = Imagem;
    this.Nome = Nome;
    this.Nota = Nota;
    this.Classificacao = Classificacao;
    this.Plataforma = Plataforma;
    this.Id = Id;
  }

  // Método assíncrono que cria e insere o card
  async CriarCard(container) {
    const gameElement = document.createElement("li");
    gameElement.className = "game";

    // Gera IDs únicos para os elementos de descrição e gêneros, usando o ID do jogo
    const idDescricao = `desc-${this.Id}`;
    const idGeneros = `generos-${this.Id}`;

    // Define o HTML do card 
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

    // Adiciona o card ao container da página
    container.appendChild(gameElement);

    try {
       // Busca informações detalhadas do jogo
      const detalhes = await buscarDetalhesDoJogo(this.Id);
      const descricaoElement = document.getElementById(idDescricao);
      const generosElement = document.getElementById(idGeneros);

      // Atualiza os gêneros
      if (detalhes.generos && detalhes.generos.length > 0) {
        generosElement.innerHTML = `<strong>Gêneros:</strong> ${detalhes.generos.join(", ")}`;
      } else {
        generosElement.innerHTML = `<strong>Gêneros:</strong> Não disponível`;
      }

      // Atualiza a descrição
      const descricao = detalhes.descricao;
      if (descricao.length > 100) {
        const resumo = descricao.slice(0, 100) + "...";
        const botao = document.createElement("button");
        botao.textContent = "Ler mais";
        botao.classList.add("ler-mais-btn");

        let expandido = false;

        botao.addEventListener("click", (event) => {
          event.stopPropagation(); // Evita que o clique no botão redirecione para outra página
          expandido = !expandido;
          descricaoElement.innerHTML = `<strong>Descrição:</strong> ${expandido ? descricao : resumo}`;
          descricaoElement.appendChild(botao);
          botao.textContent = expandido ? "Mostrar menos" : "Ler mais";
        });

        // Exibe o resumo e adiciona o botão
        descricaoElement.innerHTML = `<strong>Descrição:</strong> ${resumo}`;
        descricaoElement.appendChild(botao);
      } else {
        // Se a descrição for curta, exibe direto
        descricaoElement.innerHTML = `<strong>Descrição:</strong> ${descricao}`;
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
      document.getElementById(idDescricao).innerHTML = `<strong>Descrição:</strong> Não disponível`;
      document.getElementById(idGeneros).innerHTML = `<strong>Gêneros:</strong> Não disponível`;
    }

    // Redireciona para a página de detalhes do jogo
    gameElement.addEventListener("click", () => {
      window.location.href = `jogo.html?id=${this.Id}`;
    });
  }
}

// Exporta a classe para que possa ser usada em outros módulos
export default CardGame;
