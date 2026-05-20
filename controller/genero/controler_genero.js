/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de gênero
 *  Data 20/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const generoDAO = require('../../model/DAO/genero/genero.js') // ajuste o caminho se necessário

const inserirNovoGenero = async function (genero, contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'.toUpperCase()) {
            let validar = await validarDados(genero)

            if (validar) {
                return validar // 400
            } else {
                let result = await generoDAO.insertGenero(genero)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = genero

                } else {
                    return message.ERROR_INTERNAL_SEVER_MODE // 500
                }
                return message.DEFAULT_MESSAGE
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (controller)
    }
}

const buscarGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await generoDAO.selectByIdGenero(id)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.genero = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const atualizarGenero = async function (genero, id, contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let resultID = await buscarGenero(id)

            if (resultID.status) {
                let validar = await validarDados(genero)

                if (!validar) {
                    genero.id = id

                    let result = await generoDAO.updateGenero(genero)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                        message.DEFAULT_MESSAGE.response = genero

                        return message.DEFAULT_MESSAGE // 200 (Atualizado)
                    } else {
                        return message.ERROR_INTERNAL_SEVER_MODEL // 500 (Model)
                    }
                } else {
                    return validar // 400
                }
            } else {
                return resultID // 400 ou 404 ou 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const validarDados = async function (genero) {
    console.log('teste')
    let message = JSON.parse(JSON.stringify(configMessages))

    if (genero.nome == undefined || genero.nome == null || genero.nome == '' || genero.nome.length > 45) {
        message.ERROR_BAD_REQUEST.field = '[Nome] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else if (genero.descricao == undefined || genero.descricao == null || genero.descricao == '' || genero.descricao.length > 45) {
        message.ERROR_BAD_REQUEST.field = '[Descrição] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const listarGeneros = async function () {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await generoDAO.selectAllGenero()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.generos = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SEVER_MODEL // 500 (Model)
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const excluirGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarGenero(id)

        if (resultBuscarID.status) {
            let result = await generoDAO.deleteGenero(id)

            if (result) {
                return message.SUCCESS_DELETED_ITEM // 200 (Registro excluído)
            } else {
                return message.ERROR_INTERNAL_SEVER_MODEL // 500 (Model)
            }
        } else {
            return resultBuscarID // 400 ou 404
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

module.exports = {
    inserirNovoGenero,
    buscarGenero,
    atualizarGenero,
    listarGeneros,
    excluirGenero
}