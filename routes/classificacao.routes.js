/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Classificação
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerClassificacao = require('../controller/classificacao/controler_classificacao.js')

// Inserir nova classificação
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar classificação por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar classificação por ID
router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let classificacao = request.body

    let result = await controlerClassificacao.atualizarClassificacao(classificacao, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todas as classificações
router.get('/', async function (request, response) {
    let result = await controlerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

// Excluir classificação por ID
router.delete('/', async function (request, response) {
    let id = request.params.id
    let result = await controlerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router