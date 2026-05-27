/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de Filme e Plataformas
 *  Data 22/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require('../modulo/configMessages.js')
const FilmePlataformaDAO = require('../../model/DAO/filme_plataformas/filme_plataformas.js')

const inserirNovoFilmePlataforma = async function (filmePlataforma) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        let validar = await validarDados(filmePlataforma)

        if (validar) {
            return validar // 400
        } else {
            let result = await FilmePlataformaDAO.insertFilmePlataforma(filmePlataforma)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message
                message.DEFAULT_MESSAGE.response = filmePlataforma

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

const buscarFilmePlataforma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmePlataformaDAO.selectByIdFilmePlataforma(id)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_plataforma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarFilmeIdPlataforma = async function (idPlataforma) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idPlataforma == undefined || idPlataforma == '' || idPlataforma == null || isNaN(idPlataforma)) {
            message.ERROR_BAD_REQUEST.field = '[ID_PLATAFORMA] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmePlataformaDAO.selectFilmesByIdPlataforma(idPlataforma)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_plataforma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const buscarPlataformaIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)) {
            message.ERROR_BAD_REQUEST.field = '[ID_FILME] Inválido'
            return message.ERROR_BAD_REQUEST
        } else {
            let result = await FilmePlataformaDAO.selectPlataformasByIdFilme(idFilme)

            if (result) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.filme_plataforma = result

                return message.DEFAULT_MESSAGE // 200
            } else {
                return message.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER // 500 (Controller)
    }
}

const atualizarFilmePlataforma = async function (filmePlataforma, id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultID = await buscarFilmePlataforma(id)

        if (resultID.status) {
            let validar = await validarDados(filmePlataforma)

            if (!validar) {
                filmePlataforma.id = id

                let result = await FilmePlataformaDAO.updateFilmePlataforma(filmePlataforma)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDETED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDETED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDETED_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmePlataforma
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

const validarDados = async function (filmePlataforma) {
    let message = JSON.parse(JSON.stringify(configMessages))

    if (filmePlataforma.id_filme == undefined || filmePlataforma.id_filme == null || filmePlataforma.id_filme == '' || isNaN(filmePlataforma.id_filme)) {
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else if (filmePlataforma.id_plataformas == undefined || filmePlataforma.id_plataformas == null || filmePlataforma.id_plataformas == '' || isNaN(filmePlataforma.id_plataformas)) {
        message.ERROR_BAD_REQUEST.field = '[ID_PLATAFORMAS] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const listarFilmePlataforma = async function () {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await FilmePlataformaDAO.selectAllFilmePlataforma()

        if (result) {
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filmePlataforma = result

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

const excluirFilmePlataforma = async function (id) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarID = await buscarFilmePlataforma(id)

        if (resultBuscarID.status) {
            let result = await FilmePlataformaDAO.deletePlataformaFilmes(id)

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

// Função para excluir as plataformas relacionadas com o filme
const excluirPlataformasIdFilme = async function (idFilme) {
    let message = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await FilmePlataformaDAO.deletePlataformasByIDFilme(idFilme)

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
    inserirNovoFilmePlataforma,
    buscarFilmePlataforma,
    atualizarFilmePlataforma,
    listarFilmePlataforma,
    excluirFilmePlataforma,

    buscarFilmeIdPlataforma,
    buscarPlataformaIdFilme,
    excluirPlataformasIdFilme
}