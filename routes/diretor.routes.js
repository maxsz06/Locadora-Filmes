/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Diretor
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerDiretor = require('../controller/diretor/controler_diretor.js')

// Inserir novo diretor
router.post('/inserir', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerDiretor.inserirNovoDiretor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar diretor por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerDiretor.buscarDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar diretor por ID
router.put('/atualizar/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let diretor = request.body

    let result = await controlerDiretor.atualizarDiretor(diretor, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os diretores
router.get('/listar', async function (request, response) {
    let result = await controlerDiretor.listarDiretores()

    response.status(result.status_code)
    response.json(result)
})

// Excluir diretor por ID
router.delete('/delete/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerDiretor.excluirDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router