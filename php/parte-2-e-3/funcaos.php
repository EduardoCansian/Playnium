<?php

/**
 * Envia uma resposta JSON com o código de status HTTP adequado.
 * Se o status for 204 (No Content), nada é enviado no corpo.
 * A função encerra a execução após enviar a resposta.
 */
function responder($dados, $status_code = 200) {
    http_response_code($status_code); // Define o código de status da resposta HTTP
    // Para o status 204, nenhum corpo de resposta deve ser enviado.
    if ($status_code === 204) {
        exit;
    }
    // Codifica os dados em JSON e envia
    echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Verifica se o jogo que está sendo adicionado já existe.
 * A comparação é feita com base no nome (case-insensitive), ano de lançamento e plataforma.
 * Retorna false se um jogo igual já existir, true se for único.
 */
function validarUnicidade($novoJogo, $jogosExistentes) {
    foreach ($jogosExistentes as $jogo) {
        // Compara nome, ano de lançamento e plataforma (tudo case-insensitive e tipo seguro)
        if (
            strtolower($jogo['nome']) === strtolower($novoJogo['nome']) &&
            intval($jogo['ano_lancamento']) === intval($novoJogo['ano_lancamento']) &&
            strtolower($jogo['plataforma']) === strtolower($novoJogo['plataforma'])
        ) {
            // Se encontrar um jogo igual, retorna false (não é único)
            return false;
        }
    }
    // Se não encontrar jogo igual, retorna true (é único)
    return true;
}


/**
 * Carrega os dados do arquivo JSON onde os jogos estão armazenados.
 * Se o arquivo ainda não existir, retorna um array vazio.
 */
function carregarDados() {
    $caminho_arquivo = __DIR__ . '/Dados/dados.json'; // Caminho para o arquivo de dados
    if (!file_exists($caminho_arquivo)) {
        return []; // Retorna array vazio se o arquivo não existir
    }
    $json = file_get_contents($caminho_arquivo); // Lê o conteúdo do arquivo
    return json_decode($json, true);  // Converte JSON para array associativo
}

/**
 * Salva os dados no arquivo JSON.
 * Usa array_values() para reindexar os elementos, garantindo que o array seja serializado como lista e não como objeto.
 */
function salvarDados($dados) {
    $caminho_arquivo = __DIR__ . '/Dados/dados.json'; // Caminho para o arquivo de dados
    $json = json_encode(array_values($dados), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); // Converte o array para JSON formatado
    file_put_contents($caminho_arquivo, $json); // Escreve o JSON no arquivo
}

/**
 * Retorna o próximo ID disponível para um novo jogo.
 * Se o array estiver vazio, retorna 1 como primeiro ID.
 * Caso contrário, pega o maior ID atual e soma 1.
 */
function PegarporId($dados) {
    if (empty($dados)) {
        return 1; // Primeiro ID
    }
    return max(array_column($dados, 'id')) + 1; // ID mais alto + 1
}

/**
 * Valida os dados fornecidos para criação ou atualização de um jogo.
 * Retorna um array de erros encontrados; se estiver vazio, os dados são válidos.
 */
function validarDados($dados) {
    $erros = [];

    // Validação do campo "nome"
    if (empty($dados['nome'])) {
        $erros['nome'] = 'O campo nome é obrigatório.';
    } elseif (strlen($dados['nome']) < 3) {
        $erros['nome'] = 'O nome deve ter no mínimo 3 caracteres.';
    }

    // Validação do campo "ano_lancamento"
    if (empty($dados['ano_lancamento'])) {
        $erros['ano_lancamento'] = 'O campo ano de lançamento é obrigatório.';
    } elseif (!is_numeric($dados['ano_lancamento']) || strlen((string)$dados['ano_lancamento']) !== 4) {
        $erros['ano_lancamento'] = 'O ano de lançamento deve ser um número com 4 dígitos.';
    }

    // Validação do campo "plataforma"
    if (empty($dados['plataforma'])) {
        $erros['plataforma'] = 'O campo plataforma é obrigatório.';
    }

    // Retorna todos os erros encontrados
    return $erros;
}

?>
