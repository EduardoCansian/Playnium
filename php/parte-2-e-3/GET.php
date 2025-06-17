<?php
// Carrega todos os jogos do "banco de dados" (normalmente um arquivo JSON)
$jogos = carregarDados();

// Verifica se um ID foi fornecido na URL para buscar um jogo específico
if ($id !== null) {
    // Inicializa a variável que armazenará o jogo encontrado
    $jogoEncontrado = null;
    
    // Percorre a lista de jogos buscando um com o ID correspondente
    foreach ($jogos as $jogo) {
        // Compara o ID do jogo atual com o ID passado na URL
        if ($jogo['id'] == $id) {
            $jogoEncontrado = $jogo; // Jogo encontrado
            break; // Interrompe o loop
        }
    }
    // Se o jogo foi encontrado, retorna os dados com status 200 (OK)
    if ($jogoEncontrado) {
        responder($jogoEncontrado, 200);
    } else {
        responder(['erro' => 'Jogo não encontrado.'], 404); // Se o jogo não for encontrado, retorna erro 404 (Not Found)

    }
} else {
    // Se nenhum ID foi passado, retorna a lista completa de jogos
    responder($jogos, 200);
}

?>
