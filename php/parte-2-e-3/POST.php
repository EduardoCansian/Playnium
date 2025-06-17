<?php

require_once __DIR__ . '/funcaos.php';

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

// Carrega dados já existentes
$jogos = carregarDados();

// Validação de unicidade
if (!validarUnicidade($dadosEntrada, $jogos)){
    responder(['erro' => 'Jogo já cadastrado com mesmo nome, ano e plataforma.'], 400);
    exit;
}
// Se a validação passou, cria o novo recurso
$novoJogo = [
    'id' => PegarporId($jogos),
    'nome' => $dadosEntrada['nome'],
    'ano_lancamento' => (int)$dadosEntrada['ano_lancamento'],
    'plataforma' => $dadosEntrada['plataforma']
];

$jogos[] = $novoJogo;
salvarDados($jogos);

// Retorna o novo jogo criado com o status 201
responder($novoJogo, 201);
?>