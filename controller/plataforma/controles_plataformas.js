/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e manipulação de dados
 *            para o CRUD de plataforma
 *  Data 22/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const plataformaDAO = require('../../model/DAO/plataformas/plataformas.js') // ajuste o caminho

const inserirNovaPlataforma = async function (plataforma, contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'.toUpperCase()) {
            let validar = await validarDados(plataforma)

            if (validar) {
                return validar // 400
            } else {
                let result = await plataformaDAO.insertPlataforma(plataforma)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = plataforma

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
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarPlataforma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await plataformaDAO.selectByIdPlataforma(id)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.plataforma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const atualizarPlataforma = async function (plataforma, id, contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLocaleUpperCase() == 'APPLICATION/JSON') {
            let resultID = await buscarPlataforma(id)

            if (resultID.status) {
                let validar = await validarDados(plataforma)

                if (!validar) {
                    plataforma.id = id

                    let result = await plataformaDAO.updatePlataforma(plataforma)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                        message.DEFAULT_MESSAGE.response = plataforma

                        return message.DEFAULT_MESSAGE // 200
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

const validarDados = async function (plataforma) {
    let message = JSON.parse(JSON.stringify(configMessages))

    if (plataforma.nome == undefined || plataforma.nome == null || plataforma.nome == '' || plataforma.nome.length > 25) {
        message.ERROR_BAD_REQUEST.field = '[Nome] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else if (plataforma.img == undefined || plataforma.img == null || plataforma.img == '' || plataforma.img.length > 250) {
        message.ERROR_BAD_REQUEST.field = '[Img] INVÁLIDA'
        return message.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const listarPlataformas = async function () {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await plataformaDAO.selectAllPlataforma()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.plataformas = result

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

const excluirPlataforma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarPlataforma(id)

        if (resultBuscarID.status) {
            let result = await plataformaDAO.deletePlataforma(id)

            if (result) {
                return message.SUCCESS_DELETED_ITEM // 200
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
    inserirNovaPlataforma,
    buscarPlataforma,
    atualizarPlataforma,
    listarPlataformas,
    excluirPlataforma
}