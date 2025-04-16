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
  }

document.getElementById("login").addEventListener("click", function (e) {
  e.preventDefault(); // impede o envio automático

  const cpf = document.getElementById("cpf").value.trim();
  const senha = document.getElementById("inputsenha").value.trim();

  if (cpf === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  else{
     window.location.href = "./html/playnium.html"; // redireciona se os dados estiverem corretos
  }
  
});