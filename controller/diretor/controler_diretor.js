/***********************************************************************************************
 *  Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *            para o CRUD de Diretor
 *  Data: 20/05/2026
 *  Autor: Maxwillian
 *  Versão: 1.0
 **********************************************************************************************/

const config_message = require('../modulo/configMessages.js')
const diretorDAO    = require('../../model/DAO/diretor/diretor.js')

const inserirNovoDiretor = async function (diretor, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(diretor)

            if (validar) {
                return validar // 400
            } else {
                let result = await diretorDAO.insertDiretor(diretor)

                if (result) {
                    diretor.id = result

                    message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = diretor

                    return message.DEFAULT_MESSAGE // 201
                } else {
                    return message.ERROR_INTERNAL_SEVER_MODEL // 500
                }
            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500
    }
}


const atualizarDiretor = async function (diretor, id, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarID = await buscarDiretor(id)

            if (resultBuscarID.status) {

                let validar = await validarDados(diretor)

                if (!validar) {
                    diretor.id = id

                    let result = await diretorDAO.updateDiretor(diretor)

                    if (result) {
                        message.DEFAULT_MESSAGE.status      = message.SUCCESS_UPDETED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCCESS_UPDETED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = diretor

                        return message.DEFAULT_MESSAGE // 200
                    } else {
                        return message.ERROR_INTERNAL_SEVER_MODEL // 500
                    }
                } else {
                    return validar // 400
                }

            } else {
                return resultBuscarID // 400 | 404 | 500
            }

        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500
    }
}

const listarDiretores = async function () {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let result = await diretorDAO.selectAllDiretor()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status           = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code      = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response         = {}
                message.DEFAULT_MESSAGE.response.count   = result.length
                message.DEFAULT_MESSAGE.response.diretor = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        } else {
            return message.ERROR_INTERNAL_SEVER_MODEL // 500
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500
    }
}


const buscarDiretor = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (id == '' || id == null || id == undefined || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status           = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code      = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response         = {}
                    message.DEFAULT_MESSAGE.response.diretor = result

                    return message.DEFAULT_MESSAGE // 200
                } else {
                    return message.ERROR_NOT_FOUND // 404
                }
            } else {
                return message.ERROR_INTERNAL_SEVER_MODEL // 500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500
    }
}


const excluirDiretor = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        let resultBuscarID = await buscarDiretor(id)

        if (resultBuscarID.status) {
            let result = await diretorDAO.deleteDiretor(id)

            if (result) {
                return message.SUCCESS_DELETED_ITEM // 200
            } else {
                return message.ERROR_INTERNAL_SEVER_MODEL // 500
            }
        } else {
            return resultBuscarID // 400 | 404 | 500
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500
    }
}


const validarDados = async function (diretor) {
    let message = JSON.parse(JSON.stringify(config_message))

    if (diretor.nome == undefined || diretor.nome == null || diretor.nome == '' || diretor.nome.length > 50) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST // 400

    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == null || diretor.data_nascimento == '' || diretor.data_nascimento.length != 10) {
        message.ERROR_BAD_REQUEST.field = '[DATA_NASCIMENTO] INVÁLIDA'
        return message.ERROR_BAD_REQUEST // 400

    } else if (diretor.biografia != undefined && diretor.biografia != null && diretor.biografia.length > 500) {
        message.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA — máx. 500 caracteres'
        return message.ERROR_BAD_REQUEST // 400

    } else if (diretor.foto != undefined && diretor.foto != null && diretor.foto.length > 250) {
        message.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDA — máx. 250 caracteres'
        return message.ERROR_BAD_REQUEST // 400

    } else if (diretor.tipo != undefined && diretor.tipo != null && diretor.tipo.length > 45) {
        message.ERROR_BAD_REQUEST.field = '[TIPO] INVÁLIDO — máx. 45 caracteres'
        return message.ERROR_BAD_REQUEST // 400

    } else {
        return false
    }
}

module.exports = {
    inserirNovoDiretor,
    atualizarDiretor,
    listarDiretores,
    buscarDiretor,
    excluirDiretor
}