/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de Filme e Idioma
 *  Data 29/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js')

const FilmeIdiomaDAO = require('../../model/DAO/filme_idioma/filme_idioma.js')

const inserirNovoFilmeIdioma = async function (filmeIdioma) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let validar = await validarDados(filmeIdioma)

        if (validar) {
            return validar // 400
        } else {
            let result = await FilmeIdiomaDAO.insertFilmeIdioma(filmeIdioma)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = filmeIdioma

            } else {
                return message.ERROR_INTERNAL_SEVER_MODEL // 500
            }
            return message.DEFAULT_MESSAGE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (controller)
    }
}

const buscarFilmeIdioma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmeIdiomaDAO.selectByIdFilmeIdioma(id)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_idioma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarFilmeIdIdioma = async function (idIdioma) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idIdioma == undefined || idIdioma == '' || idIdioma == null || isNaN(idIdioma)) {
            message.ERROR_BAD_REQUEST.field = '[ID_IDIOMA] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmeIdiomaDAO.selectByIdFilmeIdioma(idIdioma)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_idioma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarIdiomaIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)) {
            message.ERROR_BAD_REQUEST.field = '[ID_FILME] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmeIdiomaDAO.selectIdiomasByIdFilme(idFilme)

            if (result && result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_idioma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const atualizarFilmeIdioma = async function (filmeIdioma, id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultID = await buscarFilmeIdioma(id)

        if (resultID.status) {
            let validar = await validarDados(filmeIdioma)

            if (!validar) {
                filmeIdioma.id = id

                let result = await FilmeIdiomaDAO.updateFilmeIdioma(filmeIdioma)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmeIdioma
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
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const validarDados = async function (filmeIdioma) {
    let message = JSON.parse(JSON.stringify(configMessages))

    if (filmeIdioma.id_filme == undefined || filmeIdioma.id_filme == null || filmeIdioma.id_filme == '' || isNaN(filmeIdioma.id_filme)) {
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else if (filmeIdioma.id_idioma == undefined || filmeIdioma.id_idioma == null || filmeIdioma.id_idioma == '' || isNaN(filmeIdioma.id_idioma)) {
        message.ERROR_BAD_REQUEST.field = '[ID_IDIOMA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const listarFilmeIdioma = async function () {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await FilmeIdiomaDAO.selectAllFilmeIdioma()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filmeIdioma = result

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

const excluirFilmeIdioma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarFilmeIdioma(id)

        if (resultBuscarID.status) {
            let result = await FilmeIdiomaDAO.deleteFilmeIdioma(id)

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

const excluirIdiomasIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await FilmeIdiomaDAO.deleteIdiomaByIdFilme(idFilme)

        if (result) {
            return message.SUCCESS_DELETED_ITEM // 200 (Registro excluído)
        } else {
            return message.ERROR_INTERNAL_SEVER_MODEL // 500 (Model)
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

module.exports = {
    inserirNovoFilmeIdioma,
    buscarFilmeIdioma,
    atualizarFilmeIdioma,
    listarFilmeIdioma,
    excluirFilmeIdioma,

    buscarFilmeIdIdioma,
    buscarIdiomaIdFilme,
    excluirIdiomasIdFilme
}