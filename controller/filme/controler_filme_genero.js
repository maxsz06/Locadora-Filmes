/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de Filme e Generos
 *  Data 22/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const FilmegeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js') 

const inserirNovoFilmeGenero = async function (filmeGenero) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
            let validar = await validarDados(filmeGenero)

            if (validar) {
                return validar // 400
            } else {
                let result = await FilmegeneroDAO.insertFilmeGenero(filmeGenero)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmeGenero // 

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

const buscarFilmeGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmegeneroDAO.selectByIdFilmeGenero(id)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_genero = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarFilmeIdGenero = async function (idGenero) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idGenero == undefined || idGenero == '' || idGenero == null || isNaN(idGenero)) {
            message.ERROR_BAD_REQUEST.field = '[ID_Genero] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmegeneroDAO.selectFilmesByIdGenero(idGenero)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_genero = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarGeneroIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)) {
            message.ERROR_BAD_REQUEST.field = '[ID_Filme] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmegeneroDAO.selectGenerosByIdFIlmes(idFilme)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_genero = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}


const atualizarFilmeGenero = async function (filmeGenero, id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
            let resultID = await buscarFilmeGenero(id) 

            if (resultID.status) {
                let validar = await validarDados(filmeGenero)

                if (!validar) {
                    filmeGenero.id = id 

                    let result = await FilmegeneroDAO.updateFilmeGenero(filmeGenero)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                        message.DEFAULT_MESSAGE.response = filmeGenero 
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

const validarDados = async function (filmeGenero) {
    console.log('teste')
    let message = JSON.parse(JSON.stringify(configMessages))

    if (filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme == '' || isNaN(filmeGenero.id_filme)) {
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else if (filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero == '' || isNaN(filmeGenero.id_genero)) {
        message.ERROR_BAD_REQUEST.field = '[ID_GENERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const listarFilmeGenero = async function () {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await FilmegeneroDAO.selectAllFilmeGenero()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filmeGenero = result

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

const excluirFilmeGenero = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarFilmeGenero(id)

        if (resultBuscarID.status) {
            let result = await FilmegeneroDAO.deleteFilmeGenero(id)

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

//Função para excluir os generos relacionados com o filme
const excluirGenerosIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await FilmegeneroDAO.deleteGenerosByIDFilme(idFilme)

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
    inserirNovoFilmeGenero,
    buscarFilmeGenero,
    atualizarFilmeGenero,
    listarFilmeGenero,
    excluirFilmeGenero,

    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirGenerosIdFilme
}