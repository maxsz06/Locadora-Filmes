const express = require('express')//Import do Express
const router = express.Router() // cria um objeto de rota para o arquivo
const generoController = require('../controller/genero/controler_genero.js') // ajuste o caminho se necessário
const bodyParser    = require('body-parser')
const bodyParserJSON = bodyParser.json()

// ------------------------ [END POINTS DE GENERO ] -----------------------------------------------------
router.post('/', bodyParserJSON, async function (request, response) { // Inserir novo Genero
  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await generoController.inserirNovoGenero(dados, contentType)

  response.status(result.status_code)
  response.json(result)
})

router.get('/', async function (request, response) {
  let result = await generoController.listarGeneros()

  response.status(result.status_code)
  response.json(result)
})

router.get('/:id', async function (request, response) { // buscar GENERO pelo ID
  let id = request.params.id
  let result = await generoController.buscarGenero(id)

  response.status(result.status_code)
  response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let genero = request.body

  let result = await generoController.atualizarGenero(genero, id, contentType)

  response.status(result.status_code)
  response.json(result)
})


router.delete('/:id', async function (request, response) {
  let id = request.params.id
  let result = await generoController.excluirGenero(id)

  response.status(result.status_code)
  response.json(result)
})
// --------------------------------------------------------------------------------------------------------------

//Export para o app ter acesso as rotas do genero
module.exports = router 