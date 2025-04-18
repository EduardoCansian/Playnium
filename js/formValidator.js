import { renderizarJogos } from "./dom.js";
// Mostrar/ocultar senha
function mostraSenha() {
  const senha = document.getElementById("inputsenha");
  const btn = document.getElementById("btn-senha");
  if (senha.type === "password") {
      senha.type = "text";
      btn.className = "bi bi-eye-slash-fill";
  } else {
      senha.type = "password";
      btn.className = "bi bi-eye-fill";
  }
}

// Tooltip de erro
function mostrarErro(campo, mensagem) {
  const erro = document.createElement("div");
  erro.classList.add("erro-msg");

  // Posição relativa para colocar tooltip corretamente
  const container = campo.parentNode;
  container.style.position = "relative";
  erro.innerText = mensagem;

  campo.classList.add("erro-input");
  container.appendChild(erro);
}

// Limpar erros anteriores
function limparErros() {
  document.querySelectorAll(".erro-msg").forEach(el => el.remove());
  document.querySelectorAll(".erro-input").forEach(el => el.classList.remove("erro-input"));
}

// Validações
function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf);
}

function validarTelefone(telefone) {
  return /^\d{2}\d{8,9}$/.test(telefone);
}

function validarSenha(senha) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);
}

function emailOuCpfJaCadastrado(email, cpf) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  return usuarios.some(u => u.email === email || u.cpf === cpf);
}

// Cadastro
const botaoCadastro = document.getElementById("cadastro");
if (botaoCadastro) {
  botaoCadastro.addEventListener("click", () => {
      limparErros();

      const nome = document.getElementById("nome");
      const cpf = document.getElementById("cpf");
      const email = document.getElementById("email");
      const telefone = document.getElementById("telefone");
      const senha = document.getElementById("senha");

      let valido = true;

      if (!nome.value.trim()) {
          mostrarErro(nome, "Nome é obrigatório");
          valido = false;
      }
      if (!validarCPF(cpf.value)) {
          mostrarErro(cpf, "CPF inválido (11 números)");
          valido = false;
      }
      if (!validarTelefone(telefone.value)) {
          mostrarErro(telefone, "Telefone com DDD (ex: 11987654321)");
          valido = false;
      }
      if (!email.value.includes("@")) {
          mostrarErro(email, "E-mail inválido");
          valido = false;
      }
      if (!validarSenha(senha.value)) {
          mostrarErro(senha, "Mínimo 8 caracteres, 1 letra maiúscula e 1 número");
          valido = false;
      }
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      const emailExiste = usuarios.some(u => u.email === email.value);
      const cpfExiste = usuarios.some(u => u.cpf === cpf.value);

      if (emailExiste) {
          mostrarErro(email, "E-mail já cadastrado");
          valido = false;
      }

      if (cpfExiste) {
          mostrarErro(cpf, "CPF já cadastrado");
          valido = false;
      }


      if (valido) {
          const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
          usuarios.push({
              nome: nome.value,
              cpf: cpf.value,
              email: email.value,
              telefone: telefone.value,
              senha: senha.value,
          });
          localStorage.setItem("usuarios", JSON.stringify(usuarios));

          // Mensagem de sucesso
          const sucesso = document.createElement("div");
          sucesso.classList.add("erro-msg");
          sucesso.style.backgroundColor = "#28a745";
          sucesso.innerText = "Cadastro concluído com sucesso!";
          document.querySelector(".mensagem-cadastro").appendChild(sucesso);

          // Limpar campos
          nome.value = "";
          cpf.value = "";
          email.value = "";
          telefone.value = "";
          senha.value = "";

          setTimeout(() => sucesso.remove(), 3000);
      }
  });
}

// Login
const botaoLogin = document.getElementById("login");
if (botaoLogin) {
  botaoLogin.addEventListener("click", () => {
      limparErros();
      const email = document.getElementById("email");
      const senha = document.getElementById("inputsenha");
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

      const usuarioEncontrado = usuarios.find(u => u.email === email.value && u.senha === senha.value);

      if (usuarioEncontrado) {
          localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
          window.location.href = "./html/playnium.html";
      } else {
          mostrarErro(email, "E-mail ou senha incorretos");
      }
  });
}

export async function validarFormulario() {
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