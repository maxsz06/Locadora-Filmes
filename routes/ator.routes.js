/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Ator
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerAtor = require('../controller/ator/ator_controler.js')

// Inserir novo ator
router.post('/inserir', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerAtor.inserirNovoAtor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar ator por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerAtor.buscarAtor(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar ator por ID
router.put('/atualizar/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let ator = request.body

    let result = await controlerAtor.atualizarAtor(ator, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os atores
router.get('/listar', async function (request, response) {
    let result = await controlerAtor.listarAtor()

    response.status(result.status_code)
    response.json(result)
})

// Excluir ator por ID
router.delete('/delete/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerAtor.excluirAtor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router