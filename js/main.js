import { buscarJogos } from "./api.js";
import { renderizarJogos } from "./dom.js";

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const jogos = await buscarJogos();
  renderizarJogos(jogos);
});
