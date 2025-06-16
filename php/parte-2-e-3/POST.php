<?php
// Pega os dados enviados no corpo da requisição
$dadosEntrada = json_decode(file_get_contents('php://input'), true);

// Verifica se o JSON enviado é válido
if (json_last_error() !== JSON_ERROR_NONE) {
    responder(['erro' => 'JSON inválido no corpo da requisição.'], 400);
}

// Valida os dados recebidos
$erros = validarDados($dadosEntrada);
if (!empty($erros)) {
    responder(['erros_validacao' => $erros], 400);
}

// Se a validação passou, cria o novo recurso
$jogos = carregarDados();
$novoJogo = [
    'id' => getNextId($jogos),
    'nome' => $dadosEntrada['nome'],
    'ano_lancamento' => (int)$dadosEntrada['ano_lancamento'],
    'plataforma' => $dadosEntrada['plataforma']
];

$jogos[] = $novoJogo;
salvarDados($jogos);

// Retorna o novo jogo criado com o status 201
responder($novoJogo, 201);
?>