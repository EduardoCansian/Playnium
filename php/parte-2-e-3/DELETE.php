<?php
// DELETE exige que um ID seja informado na URL
if ($id === null) {
    responder(['erro' => 'É necessário informar um ID para exclusão.'], 400);
}

$jogos = carregarDados();
$indiceDoJogo = null;

// Procura o índice do jogo que será excluído
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

// Remove o jogo do array usando o índice
array_splice($jogos, $indiceDoJogo, 1);

salvarDados($jogos);

// Retorna o status 204 No Content, que significa sucesso sem conteúdo no corpo.
responder(null, 204);