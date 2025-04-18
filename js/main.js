import { buscarJogos } from "./api.js";   // Importa a função que busca os jogos na API
import { renderizarJogos } from "./dom.js";   // Importa a função responsável por renderizar os jogos na tela
import { validarFormulario } from "./buscaValidator.js"   // Importa a função que valida os campos do formulário de busca

// Adiciona um event listener para o evento de envio (submit) do formulário de busca
document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Verifica se os dados do formulário são válidos
  if (validarFormulario() === true) {
    const jogos = await buscarJogos();    // Busca os jogos na API
    renderizarJogos(jogos);   // Renderiza os jogos retornados na tela
  }
});
