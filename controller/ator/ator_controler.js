/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de classificação
 *  Data 13/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js') // inport do arquivo de padronização de mensagens
const atorDAO = require('../../model/DAO/ator/ator.js')

const inserirNovoAtor = async function(ator,contentType) {
    let message = JSON.parse(JSON.stringify(configMessages)) // Criando um clone do objeto JSON para manipular sua estrutura locam sem modificar sua estrutura local

    try {
         if (String(contentType).toUpperCase() == "APPLICATION/JSON".toUpperCase()) {
            let validar = await validarDados(ator)

                if(validar){
                  return validar // 400
                }else{
                    let result = await atorDAO.insertAtor(ator) // encaminha as informaçãoes para o DAO
                    console.log(result)
                    if (result) { // 201
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status;
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message;

                    } else {
                        return message.ERROR_INTERNAL_SEVER_MODEL; // 500
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

const atualizarAtor = async function (ator,id,contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
     if(String(contentType).toLocaleUpperCase()=='APPLICATION/JSON'){
      let resultID = await buscarAtor(id) // Buscando o id da classificação
    
      if(resultID.status){
        let validar = await validarDados(ator)
         if(!validar){
          ator.id=id
    
           let result = await atorDAO.updateAtor(ator)
    
           if(result){
                message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                message.DEFAULT_MESSAGE.response = ator
    
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

const listarAtor = async function () {
      let message = JSON.parse(JSON.stringify(configMessages))
      try {
        let result = await atorDAO.selectAllAtor()
    
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

const buscarAtor = async function (id) { 
      let message = JSON.parse(JSON.stringify(configMessages))
      
      try {
        if(id== undefined || id == '' || id == null || isNaN(id)){
          message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        }else{
          let result = await atorDAO.selectByIdAtor(id)
          
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

const excluirAtor = async function (id) {
      let message = JSON.parse(JSON.stringify(configMessages));
      
      try {
        let resultBuscarID = await buscarAtor(id)
    
        if(resultBuscarID.status){
          let result  = await atorDAO.deleteAtor(id)
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

const validarDados = async function (ator) {
    const configMessages = require('../modulo/configMessages.js')
    if (ator.nome == undefined || ator.nome == null || ator.nome == '' || ator.nome.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento == "" || ator.data_nascimento.length !== 10) {
        configMessages.ERROR_BAD_REQUEST.field = "[DATA] INVÁLIDA";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.biografia && ator.biografia.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] Limite de caracteres ultrapassado '250'";
        return configMessages.ERROR_BAD_REQUEST;

    } else if (ator.foto == undefined || ator.foto == null || ator.foto == '' || ator.foto.length > 250) {
        configMessages.ERROR_BAD_REQUEST.field = "[FOTO] INVÁLIDA";
        return configMessages.ERROR_BAD_REQUEST;
    }else{
        return false
    }
}

module.exports={
    inserirNovoAtor,
    atualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor,
    validarDados
}

