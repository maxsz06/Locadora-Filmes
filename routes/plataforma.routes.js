/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Plataforma
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerPlataforma = require('../controller/plataforma/controles_plataformas.js')

// Inserir nova plataforma
router.post('/inserir', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerPlataforma.inserirNovaPlataforma(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar plataforma por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerPlataforma.buscarPlataforma(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar plataforma por ID
router.put('/atualizar/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let plataforma = request.body

    let result = await controlerPlataforma.atualizarPlataforma(plataforma, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todas as plataformas
router.get('/listar', async function (request, response) {
    let result = await controlerPlataforma.listarPlataformas()

    response.status(result.status_code)
    response.json(result)
})

// Excluir plataforma por ID
router.delete('/delete/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerPlataforma.excluirPlataforma(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router