// Chave de acesso à API do RAWG
const API_KEY = "c46d0f85532b4ec6a3944b6377b828e5";
// URL base da API
const BASE_URL = "https://api.rawg.io/api/games";

// Função para buscar a lista de jogos com base em filtros (nome, gênero, plataforma)
export async function buscarJogos() {
  const loader = document.getElementById("loader");
  const nome = document.getElementById("search-input").value;
  const genero = document.getElementById("genre-select").value;
  const plataforma = document.getElementById("platform-select").value;
  const mensagem = document.getElementById("mensagem");

  mensagem.innerText = "";
  loader.style.display = "block";

  // Monta a URL com os filtros aplicados
  let url = `${BASE_URL}?key=${API_KEY}&page_size=10`;

  //Adiciona filtro por nome, gênero e plataforma (se houver)
  if (nome) url += `&search=${encodeURIComponent(nome)}`;
  if (genero) url += `&genres=${genero}`;
  if (plataforma) url += `&platforms=${plataforma}`;

  try {
    const res = await fetch(url);  //Faz a requisiçao para a API
    const data = await res.json();  //Converte a resposta para JSON
    loader.style.display = "none";
    return data.results;  //Retorna os resultados
  } catch (err) {
    loader.style.display = "none";
    console.error("Erro ao buscar jogos:", err);  //Exibe a mensagem de erro no console
    return [];
  }
}

// Função para buscar detalhes de um jogo específico, usando o ID
export async function buscarDetalhesDoJogo(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);  // Requisição para buscar os detalhes do jogo
    const data = await res.json();  //Converte a resposta para JSON

    const descricao = data.description_raw || "Descrição não disponível.";

    // Mapeia os gêneros para uma lista de nomes ou retorna uma padrão se não existir
    const generos = data.genres
      ? data.genres.map((genero) => genero.name)
      : ["Não disponível"];

    //Retorna um objeto com as principais informações
    return {
      descricao,
      generos,
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes:", err);   //Exibe mensagem de erro no console
    //Retorna valores padrão em caso de erro
    return {
      descricao: "Descrição não disponível.",
      generos: ["Não disponível"],
    };
  }
}



