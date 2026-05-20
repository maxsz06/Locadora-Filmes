/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Genero
 * Data 20/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile')
const knexConex = knex(knexConfig.development)

const insertIdioma = async function (idioma) {
    try {
        let sql = `
        INSERT INTO tbl_idioma(
            nome,
            sigla)
        VALUES(
            '${idioma.nome}',
            '${idioma.sigla}');`

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

const updateIdioma = async function (idioma) {
    try {
        let sql = `UPDATE tbl_idioma SET
                   nome = '${idioma.nome}',
                   sigla = '${idioma.sigla}'
                   WHERE id = ${idioma.id};`

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

const selectByIdIdioma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_idioma WHERE id = ${id};`
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

const selectAllIdioma = async function () {
    try {
        let sql = `SELECT * FROM tbl_idioma;`
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

const deleteIdioma = async function (id) {
    try {
        let sql = `DELETE FROM tbl_idioma WHERE id = ${id};`
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
    insertIdioma,
    updateIdioma,
    selectByIdIdioma,
    selectAllIdioma,
    deleteIdioma
}