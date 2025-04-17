const API_KEY = "c46d0f85532b4ec6a3944b6377b828e5";
const BASE_URL = "https://api.rawg.io/api/games";

export async function buscarJogos() {
    
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

  try {
    const res = await fetch(url);
    const data = await res.json();
    loader.style.display = "none";
    return data.results;
  } catch (err) {
    loader.style.display = "none";
    console.error("Erro ao buscar jogos:", err);
    return [];
  }
}

export async function buscarDetalhesDoJogo(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}?key=${API_KEY}`);
    const data = await res.json();

    const descricao = data.description_raw || "Descrição não disponível.";

    const generos = data.genres
      ? data.genres.map((genero) => genero.name)
      : ["Não disponível"];

    return {
      descricao,
      generos,
    };
  } catch (err) {
    console.error("Erro ao buscar detalhes:", err);
    return {
      descricao: "Descrição não disponível.",
      generos: ["Não disponível"],
    };
  }
}



