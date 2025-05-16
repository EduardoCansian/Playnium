// Função do para mostrar e ocultar senha
function mostraSenha() {
  const senha = document.getElementById("inputsenha") || document.getElementById("senha");
  const btn = document.getElementById("btn-senha");

  if (senha && btn) {
    if (senha.type === "password") {
      senha.type = "text";
      btn.className = "bi bi-eye-slash-fill";
    } else {
      senha.type = "password";
      btn.className = "bi bi-eye-fill";
    }
  }
}

// Função que exibe uma mensagem de erro abaixo
function mostrarErro(campo, mensagem) {
  const erro = document.createElement("div");
  erro.classList.add("erro-msg");

  // Posiciona o container como relativo para facilitar o posicionamento do tooltip
  const container = campo.parentNode;
  container.style.position = "relative";
  erro.innerText = mensagem;

  // Adiciona classe de borda vermelha e insere a mensagem de erro no DOM
  campo.classList.add("erro-input");
  container.appendChild(erro);
}

// Limpar erros anteriores
function limparErros() {
  document.querySelectorAll(".erro-msg").forEach(el => el.remove());
  document.querySelectorAll(".erro-input").forEach(el => el.classList.remove("erro-input"));
}

// Validações para cadastro
function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,6}$/;
  return regex.test(email);
}

function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf);
}

function validarTelefone(telefone) {
  return /^\d{2}\d{8,9}$/.test(telefone);
}

function validarSenha(senha) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);
}

// Verifica se o e-mail ou CPF já estão cadastrados no localStorage
function emailOuCpfJaCadastrado(email, cpf) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  return usuarios.some(u => u.email === email || u.cpf === cpf);
}

// Cadastro
const botaoCadastro = document.getElementById("cadastro");
if (botaoCadastro) {
  botaoCadastro.addEventListener("click", () => {
    limparErros();

    // Variáveis de cadastro
    const nome = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const senha = document.getElementById("senha");

    let valido = true;

    // Verifica se as condições para cadastro serão atendidas
    if (!nome.value.trim()) {
      mostrarErro(nome, " Nome é obrigatório");
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
    if (!validarEmail(email.value)) {
      mostrarErro(email, "E-mail inválido");
      valido = false;
    }
    if (!validarSenha(senha.value)) {
      mostrarErro(senha, "Mínimo 8 caracteres, 1 letra maiúscula e 1 número");
      valido = false;
    }

    // Verifica duplicidade de email e CPF
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

    // Salva os dados do usuário, se não tiver nenhum erro
    if (valido) {
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
    // Busca usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioEncontrado = usuarios.find(u => u.email === email.value && u.senha === senha.value);

    if (usuarioEncontrado) {
      //Redireciona para a página de jogos
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      window.location.href = "./html/playnium.html";
    } else {
      mostrarErro(email, "E-mail ou senha incorretos");
    }
  });
}
