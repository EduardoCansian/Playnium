<?php
// PUT exige que um ID seja informado na URL
if ($id === null) {
    responder(['erro' => 'É necessário informar um ID para atualização.'], 400);
}

$dadosEntrada = json_decode(file_get_contents('php://input'), true);

// Verifica se o JSON é válido
if (json_last_error() !== JSON_ERROR_NONE) {
    responder(['erro' => 'JSON inválido no corpo da requisição.'], 400);
}

$jogos = carregarDados();
$indiceDoJogo = null;

// Procura o índice do jogo que será atualizado
foreach ($jogos as $key => $jogo) {
    if ($jogo['id'] == $id) {
        $indiceDoJogo = $key;
        break;
    }
}

// Se não encontrou, retorna erro 404
if ($indiceDoJogo === null) {
    responder(['erro' => 'Jogo não encontrado.'], 404);
}

// Valida os novos dados
$erros = validarDados($dadosEntrada);
if (!empty($erros)) {
    responder(['erros_validacao' => $erros], 400);
}

// Atualiza os dados do jogo na posição encontrada
$jogos[$indiceDoJogo] = [
    'id' => $id,
    'nome' => $dadosEntrada['nome'],
    'ano_lancamento' => (int)$dadosEntrada['ano_lancamento'],
    'plataforma' => $dadosEntrada['plataforma']
];

salvarDados($jogos);
responder($jogos[$indiceDoJogo], 200);
?>