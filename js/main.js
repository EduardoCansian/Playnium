import { buscarJogos } from "./api.js";
import { renderizarJogos } from "./dom.js";
import { validarFormulario } from "./formValidator.js";

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  validarFormulario();
  const jogos = await buscarJogos();
    renderizarJogos(jogos);
});
