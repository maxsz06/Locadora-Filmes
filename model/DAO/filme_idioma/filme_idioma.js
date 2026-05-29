/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relção entre filme e Genero
 * Data 22/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require ('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)


const insertFilmeIdioma = async function (filmeIdioma) {
    try {
        let sql = `
       INSERT INTO tbl_filme_idioma(
          id_filme,
          id_idioma)
        VALUES(
            ${filmeIdioma.id_filme},
            ${filmeIdioma.id_idioma})`

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

const updateFilmeIdioma = async function (filmeIdioma) {
    try {
        let sql = `UPDATE tbl_filme_idioma SET
                   id_filme = ${filmeIdioma.id_filme},
                   id_idioma = ${filmeIdioma.id_idioma}

                   WHERE id = ${filmeIdioma.id}`

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

const selectByIdFilmeIdioma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_filme_idioma WHERE id = ${id};`
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

const selectAllFilmeIdioma = async function () {
    try {
        let sql = `SELECT * FROM tbl_filme_idioma ORDER BY id DESC;`
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
const selectIdiomasByIdFilme = async function (idIdioma) {
    try {
        let sql = `SELECT tbl_idioma.*
    FROM tbl_idioma
        INNER JOIN tbl_filme_idioma
            ON tbl_idioma.id = tbl_filme_idioma.id_idioma
        INNER JOIN tbl_filme
            ON tbl_filme.id = tbl_filme_idioma.id_filme
    WHERE tbl_filme.id = ${idIdioma}` 
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
const selectPlataformasByIdIdioma = async function (idIdioma) {
    try {
        let sql = `SELECT tbl_idioma.*
          FROM tbl_idioma
             INNER JOIN tbl_filme_idioma
                 ON tbl_idioma.id = tbl_filme_idioma.id_idioma
             INNER JOIN tbl_filme
                   ON tbl_filme.id = tbl_filme_idioma.id_filme
             WHERE tbl_filme.id = ${idIdioma}`   
           
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

const deleteFilmeIdioma = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_idioma WHERE id = ${id};`
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
const deleteIdiomaByIdFilme = async function (idFilme) { 
    try {
        let sql = `DELETE FROM tbl_filme_idioma WHERE id_filme= ${idFilme};`
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
 insertFilmeIdioma,
 updateFilmeIdioma,
 selectByIdFilmeIdioma,
 selectAllFilmeIdioma,
 selectIdiomasByIdFilme,
 selectPlataformasByIdIdioma,
 deleteFilmeIdioma,
 deleteIdiomaByIdFilme
}