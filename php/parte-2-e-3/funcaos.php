<?php

/**
 * Envia uma resposta em formato JSON com o código de status HTTP apropriado.
 * Encerra a execução do script.
 */
function responder($dados, $status_code = 200) {
    http_response_code($status_code);
    // Para o status 204, nenhum corpo de resposta deve ser enviado.
    if ($status_code === 204) {
        exit;
    }
    echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}


function validarUnicidade($novoJogo, $jogosExistentes) {
    foreach ($jogosExistentes as $jogo) {
        if (
            strtolower($jogo['nome']) === strtolower($novoJogo['nome']) &&
            intval($jogo['ano_lancamento']) === intval($novoJogo['ano_lancamento']) &&
            strtolower($jogo['plataforma']) === strtolower($novoJogo['plataforma'])
        ) {
            return false;
        }
    }
    return true;
}


/**
 * Carrega os dados do arquivo JSON.
 * Retorna um array vazio se o arquivo não existir.
 */
function carregarDados() {
    $caminho_arquivo = __DIR__ . '/Dados/dados.json';
    if (!file_exists($caminho_arquivo)) {
        return [];
    }
    $json = file_get_contents($caminho_arquivo);
    return json_decode($json, true);
}

/**
 * Salva os dados no arquivo JSON.
 * Garante que o array seja reindexado para evitar que se torne um objeto.
 */
function salvarDados($dados) {
    $caminho_arquivo = __DIR__ . '/Dados/dados.json';
    $json = json_encode(array_values($dados), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    file_put_contents($caminho_arquivo, $json);
}

/**
 * Encontra o próximo ID disponível para um novo registro.
 */
function PegarporId($dados) {
    if (empty($dados)) {
        return 1;
    }
    return max(array_column($dados, 'id')) + 1;
}

/**
 * Valida os dados de entrada para criação ou atualização.
 * Retorna um array de erros. Se o array estiver vazio, os dados são válidos.
 */
function validarDados($dados) {
    $erros = [];

    if (empty($dados['nome'])) {
        $erros['nome'] = 'O campo nome é obrigatório.';
    } elseif (strlen($dados['nome']) < 3) {
        $erros['nome'] = 'O nome deve ter no mínimo 3 caracteres.';
    }

    if (empty($dados['ano_lancamento'])) {
        $erros['ano_lancamento'] = 'O campo ano de lançamento é obrigatório.';
    } elseif (!is_numeric($dados['ano_lancamento']) || strlen((string)$dados['ano_lancamento']) !== 4) {
        $erros['ano_lancamento'] = 'O ano de lançamento deve ser um número com 4 dígitos.';
    }

    if (empty($dados['plataforma'])) {
        $erros['plataforma'] = 'O campo plataforma é obrigatório.';
    }

    return $erros;
}

?>