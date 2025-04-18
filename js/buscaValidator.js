// Função para verificar se um dos campos estão preenchidos para fazer a busca de um jogo
export function validarFormulario() {
  const nome = document.getElementById("search-input").value.trim();
  const genero = document.getElementById("genre-select").value;
  const plataforma = document.getElementById("platform-select").value;
  const mensagem = document.getElementById("mensagem");

  if (!nome && !genero && !plataforma) {
    mensagem.innerText = "Preencha pelo menos um campo para realizar a busca.";
    return false;
  }
  mensagem.innerText = "";
  return true;
}[]