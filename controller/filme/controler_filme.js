/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de filmes
 *  Data 17/04/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const config_message = require("../modulo/configMessages.js"); // import do arquivo de predonizção de mensagens
const filmeDAO = require("../../model/DAO/filme/filme.js"); // Import do arquivo DAO para fazer o DAO  do filme no banco de dados
const controler_classificacao = require('../classificacao/controler_classificacao.js') // Import de arquivos de Controler

//Fução para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {
  let message = JSON.parse(JSON.stringify(config_message)); // Criando um clone do objeto JSON para manipular sua estrutura locam sem modificar
  //Sua estrutura Local

  try {
    if (String(contentType).toUpperCase() == "APPLICATION/JSON".toUpperCase()) {
      // Validação de dados para atributos do Filme (Status 400)
      let validar = await validarDados(filme);

      // Se a função validar retornar um JSON de erro, iremos devoler ao APP o erro
      if (validar) {
        return validar; // 400
      } else {
        let result = await filmeDAO.insertFilme(filme);
        // encaminha os dados do filme para o DAO
        if (result) { //201
          filme.id=result
          message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status;
          message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code;
          message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message;
          message.DEFAULT_MESSAGE.response = filme

        } else {
          //500
          return message.ERROR_INTERNAL_SEVER_MODEL; // 500
        }
        return message.DEFAULT_MESSAGE;
      }
    } else {
      return message.ERROR_CONTENT_TYPE; //415
    }
  } catch (error) {
    return message.ERROR_INTERNAL_CONTROLER; // 500 (controler)
  }
};
//Função para atualizar um filme
const atualizarFilme = async function (filme,id, contentType) {
  let message = JSON.parse(JSON.stringify(config_message)) 
 try {
    //Validação do contenty type para receber apenas JSON
    if(String(contentType).toUpperCase()=='APPLICATION/JSON'){
        //Validação para o id incorreto
      let resultBuscarID = await buscarFilme(id)
      
      //se a função buscar encontrar o filme o atributo status do JSON será verdadeiro
      //Isso siginifica que o filme existe na base, caso não retorne true, então
      // o retorno da função poderá ser um 400 ou 404 ou até mesmo 500
      if(resultBuscarID.status){
         let validar = await validarDados(filme) 
           if(!validar){ // Validação de campos obrigátorios para a atualizção (Body)
            filme.id = id // Adiciona o atribudo ID do filme no JSON para ser enviado ao DAO

            //chama a função do DAO para atualizar o filme (dados e o ID)
            let result = await filmeDAO.updateFilme(filme)

            if(result){
               message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
               message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
               message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
               message.DEFAULT_MESSAGE.response = filme

               return message.DEFAULT_MESSAGE // 200 (Atualizado)
            }else{
             return message.ERROR_INTERNAL_SEVER_MODEL //500 (Model)
            }
          }else{
            return validar //400  
          }  
      }else{
        console.log('teste')
          
          return resultBuscarID //400 ou 404 ou 500
      }
    }else{
      return message.ERROR_CONTENT_TYPE //415 -> ERRO NO CONTENT TYPE
    }

  } catch (error) {
    console.log(error)
    return message.ERROR_INTERNAL_CONTROLER // 500 (controler)
  }
}

//Função para retornar todos os filmes
const listarFilme = async function () {
  let message = JSON.parse(JSON.stringify(config_message)) // Criando um clone do objeto JSON para manipular sua estrutura locam sem modificar
  try {
    //chama a função do DAO para retornar todos os filmes
    
    let result = await filmeDAO.selectAllFilme()
    //Validação para ver se existe conteúdo no array
    if(result){
      if(result.length > 0){

        for (filme of result) { // Percorre o ARRAY de filmes para identificar os dados da classificação
          // busca na controler da classificação o ID referente aos dados
          let resultClassificacao = await controler_classificacao.buscarClassificacao(filme.id_classificacao)
          // Se a classificação for encontrada
          if(resultClassificacao.status){
            // Cria o atribúto classificação no filme e adiciona os dados referente a classificação 
            filme.classificacao = resultClassificacao.response.classificacao  
            delete filme.id_classificacao// Apaga o atributo id_classificação do filme para não ficar repitido
          }
        }

        message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response.count=result.length
        message.DEFAULT_MESSAGE.response.filme = result

        return message.DEFAULT_MESSAGE // 200 (Dados do filme)
      }else{
        return message.ERROR_NOT_FOUND // 404 
      }
    }else{
      return message.ERROR_INTERNAL_SEVER_MODEL //500 (model)
    }
  } catch (error) {
    return message.ERROR_INTERNAL_CONTROLER  // 500 (controler)
  }
}

//Função para buscar um filme pelo ID
const buscarFilme = async function (id) {
  let message = JSON.parse(JSON.stringify(config_message))

    try {
      //Validação para garantir o ID seja válido
      if(id == '' || id == null || id == undefined || isNaN(id) ){
        message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
          return message.ERROR_BAD_REQUEST //400
      }else{
        let result = await filmeDAO.selectByIdFilme(id)
        
        if(result){
            if(result.length>0){

              for (filme of result) { // Percorre o ARRAY de filmes para identificar os dados da classificação
                // busca na controler da classificação o ID referente aos dados
                let resultClassificacao = await controler_classificacao.buscarClassificacao(filme.id_classificacao)
                // Se a classificação for encontrada
                if(resultClassificacao.status){
                  // Cria o atribúto classificação no filme e adiciona os dados referente a classificação 
                  filme.classificacao = resultClassificacao.response.classificacao  
                  delete filme.id_classificacao// Apaga o atributo id_classificação do filme para não ficar repitido
                }
              }
              
              message.DEFAULT_MESSAGE.status =  message.SUCCESS_RESPONSE.status
              message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
              message.DEFAULT_MESSAGE.response.filme = result 

              return message.DEFAULT_MESSAGE // 200
            }else{
              return message.ERROR_NOT_FOUND //404
            }
        }else{
          return message.ERROR_INTERNAL_SEVER_MODEL // 500 (model)
        }
      }

    } catch (error) {
      console.log(error)
      return message.ERROR_INTERNAL_CONTROLER //500 (controler )
    }
};

//Função para excluir um filme
const excluirFilme = async function (id) {

  let message = JSON.parse(JSON.stringify(config_message));

  try {
    let resultBuscarID = await buscarFilme(id)

    if(resultBuscarID.status){ // validação para vereficar se o status é verdadeiro (se existe o filme)
      let result = await filmeDAO.deleteFilme(id) // chamar a função do DAO para excluir o filme
        if(result){
          return message.SUCCESS_DELETED_ITEM //200 (Registro excluído)
        }else{
          return message.ERROR_INTERNAL_SEVER_MODEL // 500 (model)
        }
    }else{
      return resultBuscarID //400 ou 404
    }
  } catch (error) {
    return message.ERROR_INTERNAL_CONTROLER; // 500 (Controller)
  }
};

//função para validar todos os dados de filmes  (obrigatorios, qtde de caracteres, etc)
const validarDados = async function (filme) {
  let message = JSON.parse(JSON.stringify(config_message));

  if (filme.nome == undefined || filme.nome == null || filme.nome == "" || filme.nome.length > 80){
    message.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO";
    console.log("erro 1");
    return message.ERROR_BAD_REQUEST;//400

  }else if (filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento == "" || filme.data_lancamento.length != 10){
    message.ERROR_BAD_REQUEST.field = "[DATA] INVÁLIDA";
    console.log("erro 2");
    return message.ERROR_BAD_REQUEST;//400

  } else if (filme.duracao == undefined || filme.duracao == null || filme.duracao == "" || filme.duracao.length < 5) {
    message.ERROR_BAD_REQUEST.field = "[DURAÇÃO] INVÁLIDO";
    console.log("erro 3 ");
    return message.ERROR_BAD_REQUEST;//400

  } else if (filme.sinopse == undefined || filme.sinopse == null || filme.sinopse == ""){
    message.ERROR_BAD_REQUEST.field = "[SINOPSE] INVÁLIDO";
    console.log("erro 4");
    return message.ERROR_BAD_REQUEST;//400

  } else if (isNaN(filme.avaliacao) || filme.avaliacao.length > 5) {
    message.ERROR_BAD_REQUEST.field = "[AVALIAÇÃO] INVÁLIDO";
    console.log("erro 5");
    return message.ERROR_BAD_REQUEST;//400

  } else if (filme.valor == undefined || filme.valor == null || filme.valor == "" || isNaN(filme.valor) || filme.valor.split('.')[0].length > 3){
    message.ERROR_BAD_REQUEST.field = "[VALOR] INVÁLIDO";
    console.log("erro 6");
    return message.ERROR_BAD_REQUEST;//400

  } else if (filme.capa.length > 255) {
    message.ERROR_BAD_REQUEST.field = "[CAPA] INVÁLIDA";
    console.log("erro 7");
    return message.ERROR_BAD_REQUEST;//400

  } else if(filme.id_classificacao == undefined || filme.id_classificacao == null || filme.id_classificacao == "" || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0){
    message.ERROR_BAD_REQUEST.field = "[ID_CLASSIFICACAO] INVÁLIDO "; // VALIDAÇÃO PARA A FK DA CLASSIFICAÇÃO
    return message.ERROR_BAD_REQUEST; //400
  }else {
    return false;
  }
};

module.exports = {
  inserirNovoFilme,
  atualizarFilme,
  listarFilme,
  buscarFilme,
  excluirFilme,
};
