<?php
// Carrega todos os jogos do "banco de dados"
$jogos = carregarDados();

// Se um ID foi passado na URL, busca por um jogo específico
if ($id !== null) {
    $jogoEncontrado = null;
    foreach ($jogos as $jogo) {
        if ($jogo['id'] == $id) {
            $jogoEncontrado = $jogo;
            break;
        }
    }

    if ($jogoEncontrado) {
        responder($jogoEncontrado, 200);
    } else {
        responder(['erro' => 'Jogo não encontrado.'], 404);
    }
} else {
    // Se nenhum ID foi passado, retorna a lista completa de jogos
    responder($jogos, 200);
}