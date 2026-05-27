/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relção entre filme e Genero
 * Data 22/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require ('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)


const insertFilmePlataforma = async function (filmePlataforma) {
    try {
        let sql = `
       INSERT INTO tbl_plataformas_filme(
          id_filme,
          id_plataformas)
        VALUES(
            ${filmePlataforma.id_filme},
            ${filmePlataforma.id_plataformas})`

        let result = await knexConex.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateFilmePlataforma = async function (filmePlataforma) {
    try {
        let sql = `UPDATE tbl_plataformas_filme SET
                   id_filme = ${filmePlataforma.id_filme},
                   id_plataformas = ${filmePlataforma.id_plataformas}

                   WHERE id = ${filmePlataforma.id}`

        let result = await knexConex.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectByIdFilmePlataforma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_plataformas_filme WHERE id = ${id};`
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const selectAllFilmePlataforma = async function () {
    try {
        let sql = `SELECT * FROM tbl_plataformas_filme ORDER BY id DESC;`
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar os dados dos filmes filtrando pelo id do genero
const selectFilmesByIdPlataforma = async function (idPlataforma) {
    try {
        let sql = `SELECT tbl_filme.*
            FROM tbl_filme
             INNER JOIN tbl_plataformas_filme
                    ON tbl_filme.id = tbl_plataformas_filme.id_filme
                INNER JOIN tbl_plataformas
                    ON tbl_plataformas.id = tbl_plataformas_filme.id_plataformas
            WHERE tbl_plataformas.id = ${idPlataforma}` 
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para retornar os dados dos generos filtrando pelo id do filme
const selectPlataformasByIdFilme = async function (idFilme) {
    try {
        let sql = `SELECT tbl_plataformas.*
               FROM tbl_plataformas
                   INNER JOIN tbl_plataformas_filme
                       ON tbl_plataformas.id = tbl_plataformas_filme.id_plataformas
                   INNER JOIN tbl_filme
                       ON tbl_filme.id = tbl_plataformas_filme.id_filme
               WHERE tbl_filme.id = ${idFilme}` 

        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const deletePlataformaFilmes = async function (id) {
    try {
        let sql = `DELETE FROM tbl_plataformas_filme WHERE id = ${id};`
        let result = await knexConex.raw(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

// Função para excluir os generos filrando pelo ID do filme
//Essa função será utilizada no Update do filme, pois precisa apagar todos os generos
//relacionados com o filme para inserir novas relações
const deletePlataformasByIDFilme = async function (idPlataforma) { 
    try {
        let sql = `DELETE FROM tbl_plataformas_filme WHERE id_filme= ${idPlataforma};`
        let result = await knexConex.raw(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    
    }
}
module.exports = {
    insertFilmePlataforma,
    updateFilmePlataforma,
    selectByIdFilmePlataforma,
    selectAllFilmePlataforma,
    deletePlataformaFilmes,
    selectFilmesByIdPlataforma,
    selectPlataformasByIdFilme,
    deletePlataformasByIDFilme
}