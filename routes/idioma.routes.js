/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Idioma
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerIdioma = require('../controller/idioma/idioma_controler.js')

// Inserir novo idioma
router.post('/inserir', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerIdioma.inserirNovoIdioma(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar idioma por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerIdioma.buscarIdioma(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar idioma por ID
router.put('/atualizar/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let idioma = request.body

    let result = await controlerIdioma.atualizarIdioma(idioma, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os idiomas
router.get('/listar', async function (request, response) {
    let result = await controlerIdioma.listarIdiomas()

    response.status(result.status_code)
    response.json(result)
})

// Excluir idioma por ID
router.delete('/delete/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerIdioma.excluirIdioma(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router 