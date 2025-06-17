<?php
// Inclui as funções auxiliares (como responder(), carregarDados(), validarDados(), etc.)
require_once __DIR__ . '/funcaos.php';

// Lê o corpo da requisição (esperado em JSON) e converte para array associativo
$dadosEntrada = json_decode(file_get_contents('php://input'), true);


// Verifica se o JSON enviado é válido
if (json_last_error() !== JSON_ERROR_NONE) {
    // Se houver erro de decodificação, retorna erro 400 (Bad Request)
    responder(['erro' => 'JSON inválido no corpo da requisição.'], 400);
}

// Valida os dados recebidos utilizando a função validarDados()
// Retorna um array com os erros encontrados, se houver
$erros = validarDados($dadosEntrada);
// Se houver erros de validação, responde com status 400 e os erros detalhados
if (!empty($erros)) {
    responder(['erros_validacao' => $erros], 400);
}

// Carrega dados já existentes
$jogos = carregarDados();

// Verifica se o jogo que está sendo enviado já existe (nome + ano + plataforma)
// Se não for único, retorna erro 400
if (!validarUnicidade($dadosEntrada, $jogos)){
    responder(['erro' => 'Jogo já cadastrado com mesmo nome, ano e plataforma.'], 400);
    exit; // Interrompe a execução após o erro
}
// Se a validação passou, cria um novo array representando o novo jogo
$novoJogo = [
    'id' => PegarporId($jogos), // Gera o próximo ID disponível
    'nome' => $dadosEntrada['nome'],
    'ano_lancamento' => (int)$dadosEntrada['ano_lancamento'],
    'plataforma' => $dadosEntrada['plataforma']
];
// Adiciona o novo jogo ao array de jogos existentes
$jogos[] = $novoJogo;
// Salva o array atualizado de volta no arquivo JSON
salvarDados($jogos);

// Retorna o novo jogo criado com o status 201
responder($novoJogo, 201);
?>
