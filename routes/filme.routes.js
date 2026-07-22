/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Filme
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerFilme = require('../controller/filme/controler_filme.js')

// Inserir novo filme
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os filmes
router.get('/', async function (request, response) {
    let result = await controlerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

// Buscar filme por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar filme por ID
router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controlerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Excluir filme por ID
router.delete('/delete/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router