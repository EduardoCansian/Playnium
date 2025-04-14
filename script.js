const API_KEY = "c46d0f85532b4ec6a3944b6377b828e5"; 
const BASE_URL = "https://api.rawg.io/api/games";

document.getElementById("search-form").addEventListener("submit", e => {
  e.preventDefault();
  buscarJogos();
});

document.getElementById("buscar").addEventListener("click", function(e) {
  e.preventDefault();

  const nome = document.getElementById("search-input").value.trim();
  const genero = document.getElementById("genre-select").value;
  const plataforma = document.getElementById("platform-select").value;
  const mensagem = document.getElementById("mensagem");

  // Verificação básica: se todos estiverem vazios
  if (!nome && (!genero || genero === "") && (!plataforma || plataforma === "")) {
    mensagem.innerText = "Por favor, preencha pelo menos um dos campos para realizar a busca.";
    return;
  }

  // Se passar na validação, limpa a mensagem e faz a busca
  mensagem.innerText = "";

  // Chame aqui sua função de busca, exemplo:
  buscarJogos(nome, genero, plataforma);
});

function buscarJogos() {
  const loader = document.getElementById("loader");
  const nome = document.getElementById("search-input").value;
  const genero = document.getElementById("genre-select").value;
  const plataforma = document.getElementById("platform-select").value;

  mensagem.innerText = "";
  loader.style.display = "block";

  let url = `${BASE_URL}?key=${API_KEY}&page_size=10`;

  if (nome) url += `&search=${encodeURIComponent(nome)}`;
  if (genero) url += `&genres=${genero}`;
  if (plataforma) url += `&platforms=${plataforma}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      mostrarJogos(data.results);
    })
    .catch(err => {
      loader.style.display = "none";
      console.error("Erro:", err);
    });
}

function mostrarJogos(jogos) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  if (jogos.length === 0) {
    container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
    return;
  }

  jogos.forEach(jogo => {
    const plataformas = jogo.platforms?.map(p => p.platform.name).join(", ") || "N/A";
    const classificacao = jogo.esrb_rating?.name || "Não informado";
    const descricao = jogo.slug.replace(/-/g, " ").slice(0, 100) + "...";

    const html = `
      <li class="game">
        <img src="${jogo.background_image}" alt="${jogo.name}">
        <div class="game-info">
          <h2>${jogo.name}</h2>
          <p><strong>Nota:</strong> ${jogo.rating} / 5</p>
          <p><strong>Classificação:</strong> ${classificacao}</p>
          <p><strong>Plataformas:</strong> ${plataformas}</p>
        </div>
      </li>
    `;
    container.innerHTML += html;
  });
}


