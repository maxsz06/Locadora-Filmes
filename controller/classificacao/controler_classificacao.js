/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de classificação
 *  Data 06/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js') // inport do arquivo de padronização de mensagens
const classificacaoDAO = require ('../../model/DAO/classificacao/classificacao.js'); // Import do arquivo DAO para fazer o DAO  da classificação no banco de dados

const inserirNovaClassificacao = async function(classificacao,contentType) {
    let message = JSON.parse(JSON.stringify(configMessages)) // Criando um clone do objeto JSON para manipular sua estrutura locam sem modificar sua estrutura local

    try {
         if (String(contentType).toUpperCase() == "APPLICATION/JSON".toUpperCase()) {
            let validar = await validarDados(classificacao)

                if(validar){
                  return validar // 400
                }else{
                let result = await classificacaoDAO.insetClassificacao(classificacao) // encaminha as informaçãoes para o DAO
                    if (result) { // 201
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status;
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message;
                    } else {
                        return message.ERROR_INTERNAL_SEVER_MODE; // 500
                    }
                    return message.DEFAULT_MESSAGE
                }
         }else{
            return message.ERROR_CONTENT_TYPE; //415
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (controler)
    }
}

const buscarClassificacao = async function(id){
  let message = JSON.parse(JSON.stringify(configMessages))
  
  try {
    if(id== undefined || id == '' || id == null || isNaN(id)){
      message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
        return message.ERROR_BAD_REQUEST
    }else{
      let result = await classificacaoDAO.selectByIdClassificacao(id)
      
      if(result){
        message.DEFAULT_MESSAGE.status =  message.SUCCESS_RESPONSE.status
        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
        message.DEFAULT_MESSAGE.response.classificacao = result

        return message.DEFAULT_MESSAGE //200
      }else{
        return message.ERROR_NOT_FOUND //404
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_CONTROLER // 500 (Controler)
  }
}

const atualizarClassificacao = async function (classificacao,id,contentType) {
  let message = JSON.parse(JSON.stringify(configMessages))
  try {
    if(String(contentType).toLocaleUpperCase()=='APPLICATION/JSON'){
      let resultID = await buscarClassificacao(id) // Buscando o id da classificação

      if(resultID.status){
        let validar = await validarDados(classificacao)
        if(!validar){
          classificacao.id=id

          let result = await classificacaoDAO.updateClassificacao(classificacao)

          if(result){
            message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
            message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
            message.DEFAULT_MESSAGE.response = classificacao

            return message.DEFAULT_MESSAGE // 200 (Atualizado)
          }else{
            return message.ERROR_INTERNAL_SEVER_MODEL //500 (Model)
          }
        }else{
          return validar //400
        }
      }else{
        return resultID //400 ou 404 ou 500
      }
    }else{
      return message.ERROR_CONTENT_TYPE //415 -> ERRO NO CONTENT TYPE
    }
  } catch (error) {
    console.log(error)
    return message.ERROR_INTERNAL_CONTROLER // 500 (controler)
  }
}
  
const validarDados = async function (classificacao){
    let message = JSON.parse(JSON.stringify(configMessages))
  if(classificacao.descricao_indicativa == undefined || classificacao.descricao_indicativa == null || classificacao.descricao_indicativa == '' || classificacao.descricao_indicativa > 45 ){
    message.ERROR_BAD_REQUEST.field = "[Descricao Indicativa] INVÁLIDA";
    console.log("erro 1");
    return message.ERROR_BAD_REQUEST;

  }else if(classificacao.idade == undefined || classificacao.idade == null || classificacao.idade == '' || isNaN(classificacao.idade) || classificacao.idade.length > 3) {
    message.ERROR_BAD_REQUEST.field = "[Classificacao da idade] INVÁLIDA";
    console.log("erro 2");
    return message.ERROR_BAD_REQUEST;
  }else{
    return false
  }
}

const listarClassificacao = async function () {
  let message = JSON.parse(JSON.stringify(configMessages))
  try {
    let result = await classificacaoDAO.selectAllClassificacao()

    if(result){
     if(result.length > 0){
       message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
       message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
       message.DEFAULT_MESSAGE.response.count=result.length
       message.DEFAULT_MESSAGE.response.classificacao = result

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

const excluirClassificacao = async function(id){
  let message = JSON.parse(JSON.stringify(configMessages));
  
  try {
    let resultBuscarID = await buscarClassificacao(id)

    if(resultBuscarID.status){
      let result  = await classificacaoDAO.deleteClassificacao(id)
      if(result){
        return message.SUCCESS_DELETED_ITEM //200 (Registro excluído)
      }else{
        return message.ERROR_INTERNAL_SEVER_MODEL // 500 (model)
      }
    }else{
      return resultBuscarID //400 ou 404
    }
  } catch (error) {
    console.log(error)
    return message.ERROR_INTERNAL_CONTROLER; // 500 (Controller)
  }
}
module.exports={
    inserirNovaClassificacao,
    buscarClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    excluirClassificacao
}