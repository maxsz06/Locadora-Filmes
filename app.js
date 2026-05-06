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

 app.post('/v1/senai/locadora/classificacao/inserir', bodyParserJSON ,async function(request,response){

  let dados = request.body
  let contentType = request.headers['content-type']
  let result = await controlerClassificacao.inserirNovaClassificacao(dados,contentType)
  
  response.status(result.status_code)
  response.json(result)
 })


//----------------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("API FUNCIONANDO E AGUARDANDO NOVAS REQUISIÇÕES ...");
});
