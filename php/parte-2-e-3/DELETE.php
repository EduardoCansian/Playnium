<?php
// Verifica se foi informado um ID na URL para realizar a exclusão
if ($id === null) {
    // Se nenhum ID for fornecido, retorna erro 400 (Bad Request)
    responder(['erro' => 'É necessário informar um ID para exclusão.'], 400);
}

// Carrega os dados atuais dos jogos (geralmente de um arquivo ou array em memória)
$jogos = carregarDados();

// Inicializa a variável que guardará o índice do jogo a ser excluído
$indiceDoJogo = null;

// Percorre o array de jogos para encontrar o índice do jogo com o ID correspondente
foreach ($jogos as $key => $jogo) {
        // Compara o ID do jogo atual com o ID fornecido na URL
    if ($jogo['id'] == $id) {
        // Se encontrar, salva o índice na variável e interrompe o loop
        $indiceDoJogo = $key;
        break;
    }
}

// Se nenhum jogo com o ID informado for encontrado, retorna erro 404 (Not Found)
if ($indiceDoJogo === null) {
    responder(['erro' => 'Jogo não encontrado.'], 404);
}

// Remove o jogo do array utilizando o índice encontrado (1 item a partir da posição $indiceDoJogo)
array_splice($jogos, $indiceDoJogo, 1);

// Salva o array atualizado (sem o jogo excluído)
salvarDados($jogos);

// Retorna o status 204 No Content, que significa sucesso sem conteúdo no corpo.
responder(null, 204);

?>
