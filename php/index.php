<?php
/**
 * Ponto de entrada da API Playnium - Parte 1
 
 */

// Dados mock: array indexado com gêneros de jogos
$genres = ['Ação', 'Aventura', 'RPG'];

// Configuração inicial de headers
header('Content-Type: application/json');

// Captura método HTTP e URI
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Roteamento básico
if ($requestMethod === 'GET') {
    handleGetRequest($requestUri);
} else {
    sendErrorResponse(405, 'Método não permitido');
}

/**
 * Manipula requisições GET
 */
function handleGetRequest($uri) {
    global $genres;
    
    // Verifica rota específica
    if (preg_match('/\/api\/genres$/', $uri)) {
        http_response_code(200);
        echo json_encode($genres);
    } else {
        sendErrorResponse(404, 'Recurso não encontrado');
    }
}

/**
 * Retorna erros padronizados em JSON
 */
function sendErrorResponse($code, $message) {
    http_response_code($code);
    echo json_encode([
        'mensagem' => $message,
        'status' => $code
    ]);
    exit;
}
?>
