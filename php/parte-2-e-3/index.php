<?php
session_start();
header('Content-Type: application/json');

// Inicializa os dados na sessão se não existirem
if (!isset($_SESSION['genres'])) {
    $_SESSION['genres'] = [
        ['id' => 1, 'nome' => 'Ação'],
        ['id' => 2, 'nome' => 'Aventura'],
        ['id' => 3, 'nome' => 'RPG']
    ];
}

// Funções utilitárias

function enviarRespostaJson($dados, $status = 200) {
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function buscarGeneroPorId($id) {
    foreach ($_SESSION['genres'] as $genre) {
        if ($genre['id'] == $id) {
            return $genre;
        }
    }
    return null;
}

function adicionarGenero($nome) {
    $novoId = gerarProximoId($_SESSION['genres']);
    $novoGenero = ['id' => $novoId, 'nome' => $nome];
    $_SESSION['genres'][] = $novoGenero;
    return $novoGenero;
}

function atualizarGenero($id, $nome) {
    foreach ($_SESSION['genres'] as &$genre) {
        if ($genre['id'] == $id) {
            $genre['nome'] = $nome;
            return $genre;
        }
    }
    return null;
}

function excluirGenero($id) {
    foreach ($_SESSION['genres'] as $i => $genre) {
        if ($genre['id'] == $id) {
            array_splice($_SESSION['genres'], $i, 1);
            return true;
        }
    }
    return false;
}

function gerarProximoId($array) {
    $maxId = 0;
    foreach ($array as $item) {
        if ($item['id'] > $maxId) {
            $maxId = $item['id'];
        }
    }
    return $maxId + 1;
}

function validarDadosGenero($dados, $atualizacao = false) {
    $erros = [];
    if (!$atualizacao && (!isset($dados['nome']) || trim($dados['nome']) === '')) {
        $erros['nome'] = 'O campo nome é obrigatório.';
    }
    if (isset($dados['nome']) && (strlen($dados['nome']) < 3 || strlen($dados['nome']) > 50)) {
        $erros['nome'] = 'O nome deve ter entre 3 e 50 caracteres.';
    }
    return $erros;
}

// Roteamento

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Remove query string e divide rota
$uri = explode('?', $requestUri, 2)[0];
$segments = explode('/', trim($uri, '/'));

// Identifica se está acessando /api/genres ou /api/genres/{id}
$isGenres = (isset($segments[1]) && $segments[0] === 'index.php' && $segments[1] === 'api' && $segments[2] === 'genres');
$id = isset($segments[3]) ? intval($segments[3]) : null;

// CRUD

// GET /api/genres - Listar todos
if ($method === 'GET' && $isGenres && !$id) {
    enviarRespostaJson($_SESSION['genres']);
}

// GET /api/genres/{id} - Buscar por ID
if ($method === 'GET' && $isGenres && $id) {
    $genero = buscarGeneroPorId($id);
    if ($genero) {
        enviarRespostaJson($genero);
    } else {
        enviarRespostaJson(['erro' => 'Gênero não encontrado.'], 404);
    }
}

// POST /api/genres - Criar novo
if ($method === 'POST' && $isGenres && !$id) {
    $dados = json_decode(file_get_contents('php://input'), true);
    $erros = validarDadosGenero($dados);
    if ($erros) {
        enviarRespostaJson(['erros' => $erros], 400);
    }
    $novoGenero = adicionarGenero($dados['nome']);
    enviarRespostaJson($novoGenero, 201);
}

// PUT /api/genres/{id} - Atualizar existente
if ($method === 'PUT' && $isGenres && $id) {
    $dados = json_decode(file_get_contents('php://input'), true);
    $genero = buscarGeneroPorId($id);
    if (!$genero) {
        enviarRespostaJson(['erro' => 'Gênero não encontrado.'], 404);
    }
    $erros = validarDadosGenero($dados, true);
    if ($erros) {
        enviarRespostaJson(['erros' => $erros], 400);
    }
    $generoAtualizado = atualizarGenero($id, $dados['nome']);
    enviarRespostaJson($generoAtualizado, 200);
}

// DELETE /api/genres/{id} - Excluir
if ($method === 'DELETE' && $isGenres && $id) {
    $genero = buscarGeneroPorId($id);
    if (!$genero) {
        enviarRespostaJson(['erro' => 'Gênero não encontrado.'], 404);
    }
    excluirGenero($id);
    enviarRespostaJson(['mensagem' => 'Gênero excluído com sucesso.'], 200);
}

// Rota não encontrada
enviarRespostaJson(['mensagem' => 'Recurso não encontrado'], 404);
?>
