<?php
require_once __DIR__ . '/funcaos.php';  // Inclui as funções auxiliares necessárias
$caminho_arquivo = __DIR__ . '/Dados/dados.json'; // Define o caminho para o arquivo de dados (JSON)



// PUT exige que um ID seja informado na URL
if ($id === null) {
    // Se nenhum ID foi passado, responde com erro 400 (Bad Request)
    responder(['erro' => 'É necessário informar um ID para atualização.'], 400);
}

// Lê os dados enviados no corpo da requisição (esperado em JSON)
$dadosEntrada = json_decode(file_get_contents('php://input'), true);

// Verifica se o JSON é válido
if (json_last_error() !== JSON_ERROR_NONE) {
    responder(['erro' => 'JSON inválido no corpo da requisição.'], 400);
}

$jogos = carregarDados(); // Carrega os dados atuais dos jogos
$indiceDoJogo = null; // Inicializa a variável que guardará o índice do jogo a ser atualizado

// Procura o índice do jogo correspondente ao ID informado
foreach ($jogos as $key => $jogo) {
    if ($jogo['id'] == $id) {
        $indiceDoJogo = $key;
        break; // Interrompe o loop ao encontrar o jogo
    }
}

// Se não encontrou, retorna erro 404
if ($indiceDoJogo === null) {
    responder(['erro' => 'Jogo não encontrado.'], 404);
}

// Valida os dados fornecidos para atualização
$erros = validarDados($dadosEntrada);
// Se houver erros de validação, responde com erro 400 e detalhes dos erros
if (!empty($erros)) {
    responder(['erros_validacao' => $erros], 400);
}

// Atualiza os dados do jogo na posição encontrada
$jogos[$indiceDoJogo] = [
    'id' => $id, // Mantém o ID original
    'nome' => $dadosEntrada['nome'],
    'ano_lancamento' => (int)$dadosEntrada['ano_lancamento'],
    'plataforma' => $dadosEntrada['plataforma']
];

salvarDados($jogos); // Salva os dados atualizados de volta no arquivo JSON
responder($jogos[$indiceDoJogo], 200); // Retorna o jogo atualizado como resposta com status 200 (OK)

?>
