/*******************************************************************************************
 *
 *
 *
 *
 *******************************************************************************************/

const express       = require("express");
const cors          = require("cors");
const app           = express();
const bodyParser    = require('body-parser')

const controlerFilme = require ('./controller/filme/controler_filme.js') // Controler FILME
const controlerClassificacao = require('./controller/classificacao/controler_classificacao.js')
const controlerSexo = require('./controller/sexo/controler_sexo.js')
const controlerAtor = require('./controller/ator/ator_controler.js')
const generoController = require('./controller/genero/controler_genero.js') // ajuste o caminho se necessário
const controlerIdioma = require('./controller/idioma/idioma_controler.js')

//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const corsOptions = {
  // Conjunto de permições a serem aplicadas no CORS da API
  origin: ["*"], // A origiem da requisisão, podendo ser um ip ou *(TODOS)
  methods: "GET, POST, PUT, DELETE, OPTIONS", // São os verbos que seraão liberados na API (GET,POST,PUT,DELETE)
  allowedHeaders: ["Content-type", "Autorization"], // São Permissãoes de cabeçario do CORS
};
app.use(cors(corsOptions)); // Configura as permissões da API através do CORS

//------------------------------------[END-POINTS]-----------------------------------------------------------------------

// END POINTS DE Filme
app.post('/v1/senai/locadora/filme', bodyParserJSON ,async function(request,response){

    // Recebe o conteúdo dentro do body da requisição
    let dados = request.body  
    let contentType = request.headers['content-type'] // recebe o contenty type da requisição para validar se é um JSON

    let result = await controlerFilme.inserirNovoFilme(dados,contentType)

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function(request,response){  // Retorna todos os filmes de baixo pra cima 
    let result = await controlerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id',async function(request,response){ // buscarFilme
  let id = request.params.id
  let result = await controlerFilme.buscarFilme(id)

   response.status(result.status_code)
   response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON,async function(request,response) { // Atualizar filme pelo ID
    let contentType = request.headers['content-type']  // recebe o content type da requisição
    let id = request.params.id // recebe o ID do registro a ser atualizado
    let dados = request.body // recebe os dados enviados no corpo da requisção

    // chama a função de atualizar na controler e encaminha os dados, id e content-type
    //obedecendo a ordem de criação na função da controler
    let result = await controlerFilme.atualizarFilme(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
  })

  app.delete('/v1/senai/locadora/filme/delete/:id',async function(request,response) {
    let id = request.params.id
    let result = await controlerFilme.excluirFilme(id)
  
   response.status(result.status_code)
    response.json(result)
  })
 // -------------------------------------------------------------
 
 // End POINT de Classificação

 app.post('/v1/senai/locadora/classificacao/inserir', bodyParserJSON ,async function(request,response){ // Inserir nova classificação

  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await controlerClassificacao.inserirNovaClassificacao(dados,contentType)
  
  response.status(result.status_code)
  response.json(result)
 })

 app.get('/v1/senai/locadora/classificacao/:id', async function(request,response) {
  let id = request.params.id
  let result = await controlerClassificacao.buscarClassificacao(id)

  response.status(result.status_code)
  response.json(result)
 })

 app.put('/v1/senai/locadora/classificacao/atualizar/:id',bodyParserJSON,async function(request,response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let classificacao = request.body

  let result = await controlerClassificacao.atualizarClassificacao(classificacao,id,contentType)

  response.status(result.status_code)
  response.json(result)
 })

 app.get('/v1/senai/locadora/listar/classificacao', async function(request,response) {
  let result = await controlerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
 })

 app.delete('/v1/senai/locadora/classificacao/delete/:id',async function (request,response) {
  let id = request.params.id
  let result = await controlerClassificacao.excluirClassificacao(id)

  response.status(result.status_code)
  response.json(result)
 })

 // End-Points de Sexo----------------------------------------------------

 app.post('/v1/senai/locadora/sexo/inserir' , bodyParserJSON , async function(request,response) {

  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await controlerSexo.inserirSexo(dados,contentType)

  response.status(result.status_code)
  response.json(result)
})

 app.get('/v1/senai/locadora/sexo/:id',async function (request,response) {
  let id = request.params.id
  let result = await controlerSexo.buscarSexo(id)

  response.status(result.status_code)
  response.json(result)
 })

 app.put('/v1/senai/locadora/atualizar/sexo/:id',bodyParserJSON, async function (request,response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let sexo = request.body

  let result = await controlerSexo.atualizarSexo(sexo,id,contentType)

  response.status(result.status_code)
  response.json(result)
 })

 app.get('/v1/senai/locadora/listar/sexo', async function(request,response) {
  let result = await controlerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
 })

 app.delete('/v1/senai/locadora/sexo/delete/:id',async function (request,response){
  let id = request.params.id
  let result = await controlerSexo.excluirSexo(id)

  response.status(result.status_code)
  response.json(result)
 })


 //--------[EndPoints - ATOR]----------------------
 app.post('/v1/senai/locadora/ator/inserir', bodyParserJSON , async function (request,response) {
  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await controlerAtor.inserirNovoAtor(dados,contentType)

  
  response.status(result.status_code)
  response.json(result)
})

app.get('/v1/senai/locadora/ator/:id',async function (request,response){
    let id = request.params.id
    let result = await controlerAtor.buscarAtor(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/atualizar/ator/:id',bodyParserJSON, async function (request,response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let ator = request.body

  let result = await controlerAtor.atualizarAtor(ator,id,contentType)

  response.status(result.status_code)
  response.json(result)
 })

 app.get('/v1/senai/locadora/listar/ator', async function(request,response) {
  let result = await controlerAtor.listarAtor()

    response.status(result.status_code)
    response.json(result)
 })

 app.delete('/v1/senai/locadora/ator/delete/:id',async function (request,response){
  let id = request.params.id
  let result = await controlerAtor.excluirAtor(id)

  response.status(result.status_code)
  response.json(result)
 }) 

//----------------------------------------------------------------------------------------------------------------------
 
// ------------------------ [END POINTS DE GENERO ] -----------------------------------------------------
app.post('/v1/senai/locadora/genero/inserir', bodyParserJSON, async function (request, response) { // Inserir novo Genero
  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await generoController.inserirNovoGenero(dados, contentType)

  response.status(result.status_code)
  response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) { // buscar GENERO pelo ID
  let id = request.params.id
  let result = await generoController.buscarGenero(id)

  response.status(result.status_code)
  response.json(result)
})

app.put('/v1/senai/locadora/atualizar/genero/:id', bodyParserJSON, async function (request, response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let genero = request.body

  let result = await generoController.atualizarGenero(genero, id, contentType)

  response.status(result.status_code)
  response.json(result)
})

app.get('/v1/senai/locadora/listar/genero', async function (request, response) {
  let result = await generoController.listarGeneros()

  response.status(result.status_code)
  response.json(result)
})

app.delete('/v1/senai/locadora/genero/delete/:id', async function (request, response) {
  let id = request.params.id
  let result = await generoController.excluirGenero(id)

  response.status(result.status_code)
  response.json(result)
})
// --------------------------------------------------------------------------------------------------------------

//-------------------[END POINTS DE Idioma]------------------------------------------

app.post('/v1/senai/locadora/idioma/inserir', bodyParserJSON, async function (request, response) {
  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await controlerIdioma.inserirNovoIdioma(dados, contentType)

  response.status(result.status_code)
  response.json(result)
})

app.get('/v1/senai/locadora/idioma/:id', async function (request, response) {
  let id = request.params.id
  let result = await controlerIdioma.buscarIdioma(id)

  response.status(result.status_code)
  response.json(result)
})

app.put('/v1/senai/locadora/atualizar/idioma/:id', bodyParserJSON, async function (request, response) {
  let contentType = request.headers['content-type']
  let id = request.params.id
  let idioma = request.body

  let result = await controlerIdioma.atualizarIdioma(idioma, id, contentType)

  response.status(result.status_code)
  response.json(result)
})

app.get('/v1/senai/locadora/listar/idioma', async function (request, response) {
  let result = await controlerIdioma.listarIdiomas()

  response.status(result.status_code)
  response.json(result)
})

app.delete('/v1/senai/locadora/idioma/delete/:id', async function (request, response) {
  let id = request.params.id
  let result = await controlerIdioma.excluirIdioma(id)

  response.status(result.status_code)
  response.json(result)
})

//-----------------------------------------------------------------------------





const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("API FUNCIONANDO E AGUARDANDO NOVAS REQUISIÇÕES ...");
});
