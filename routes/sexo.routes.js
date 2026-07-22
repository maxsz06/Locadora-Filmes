/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelas rotas de Sexo
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controlerSexo = require('../controller/sexo/controler_sexo.js')

// Inserir novo sexo
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controlerSexo.inserirSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Buscar sexo por ID
router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

// Atualizar sexo por ID
router.put('/:id', bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let sexo = request.body

    let result = await controlerSexo.atualizarSexo(sexo, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

// Listar todos os sexos
router.get('/', async function (request, response) {
    let result = await controlerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

// Excluir sexo por ID
router.delete('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controlerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router