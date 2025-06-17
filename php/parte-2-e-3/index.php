<?php
// Define o tipo de conteúdo da resposta como JSON para todas as requisições
header('Content-Type: application/json');

// Inclui apenas uma vez o arquivo com funções auxiliares (evita múltiplas inclusões)
require_once 'funcaos.php';

// Obtém o método HTTP usado na requisição (ex: GET, POST, PUT, DELETE)
$metodo = $_SERVER['REQUEST_METHOD'];


// Pega a URL e tenta extrair um ID numérico do final
$uri = $_SERVER['REQUEST_URI'];

$id = null; // Inicializa a variável $id como null

if (preg_match('/\/(\d+)$/', $uri, $matches)) { // Verifica se a URI termina com um número (ID), por exemplo: /jogos/3
    // Converte o número capturado para inteiro e armazena em $id
    $id = (int)$matches[1];
}

// Roteamento principal da API: chama o script correspondente com base no método HTTP
switch ($metodo) {
    case 'GET':
        // Para requisições GET, inclui o arquivo GET.php
        require 'GET.php';
        break;
    case 'POST':
        // Para requisições POST, inclui o arquivo POST.php
        require 'POST.php';
        break;
    case 'PUT':
        // Para requisições PUT (atualização), inclui o arquivo PUT.php
        require 'PUT.php';
        break;
    case 'DELETE':
        // Para requisições DELETE (remoção), inclui o arquivo DELETE.php
        require 'DELETE.php';
        break;
    default:
        // Se o método não for um dos esperados, retorna erro 405
        responder(['erro' => 'Método não permitido.'], 405);
        break;
}

?>
