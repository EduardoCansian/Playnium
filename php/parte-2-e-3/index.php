<?php
// Define o cabeçalho padrão para todas as respostas da API
header('Content-Type: application/json');

// Inclui o arquivo de funções essenciais uma única vez
require_once 'funcaos.php';

// Identifica o método HTTP da requisição (GET, POST, etc.)
$metodo = $_SERVER['REQUEST_METHOD'];

// Pega a URL e tenta extrair um ID numérico do final
$uri = $_SERVER['REQUEST_URI'];
$id = null;
if (preg_match('/\/(\d+)$/', $uri, $matches)) {
    $id = (int)$matches[1];
}

// Roteador: direciona a requisição para o script apropriado
switch ($metodo) {
    case 'GET':
        require 'GET.php';
        break;
    case 'POST':
        require 'POST.php';
        break;
    case 'PUT':
        require 'PUT.php';
        break;
    case 'DELETE':
        require 'DELETE.php';
        break;
    default:
        // Se o método não for um dos esperados, retorna erro 405
        responder(['erro' => 'Método não permitido.'], 405);
        break;
}