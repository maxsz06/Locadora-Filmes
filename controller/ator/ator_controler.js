/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de classificação
 *  Data 13/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js') // inport do arquivo de padronização de mensagens
const atorDAO = require('../../model/DAO/ator')

const inserirNovoAtor = async function (ator,contentType) {
}

const atualizarAtor = async function (ator,id,contentType) {
}

const listarAtor = async function () {
}

const buscarAtor = async function (id) {    
}

const excluirAtor = async function (id) {
}

const validarDados = async function (ator) {
    const configMessages = require('../modulo/configMessages.js')

    if (ator.nome == undefined || ator.nome == null || ator.nome == '' || ator.nome.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento == "" || ator.data_nascimento.length != 10) {
        configMessages.ERROR_BAD_REQUEST.field = "[DATA] INVÁLIDA";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.biografia && ator.biografia.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] Limite de caracteres ultrapassado '250'";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.foto == undefined || ator.foto == null || ator.foto == '' || ator.foto.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[FOTO] INVÁLIDA";
        return configMessages.ERROR_BAD_REQUEST;
    }else{
        return false
    }
}

module.exports={
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor,
    validarDados
}

