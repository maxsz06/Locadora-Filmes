/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Genero
 * Data 20/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require ('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)


const insertGenero = async function (genero) {
    try {
        let sql = `
        INSERT INTO tbl_genero(
            nome,
            descricao)
        VALUES(
            '${genero.nome}',
            '${genero.descricao}');`

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

const updateGenero = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero SET
                   nome = '${genero.nome}',
                   descricao = '${genero.descricao}'
                   WHERE id = ${genero.id};`

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

const selectByIdGenero = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_genero WHERE id = ${id};`
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

const selectAllGenero = async function () {
    try {
        let sql = `SELECT * FROM tbl_genero;`
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

const deleteGenero = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${id};`
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
    insertGenero,
    updateGenero,
    selectByIdGenero,
    selectAllGenero,
    deleteGenero
}