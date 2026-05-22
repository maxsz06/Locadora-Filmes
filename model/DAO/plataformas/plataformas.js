/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Diretor
 * Data 20/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/
 const knex = require('knex')
 const knexConfig = require('../../database_config_knex/knexFile')
 const knexConex = knex(knexConfig.development)

 const insertPlataforma = async function (plataforma) {
    try {
        let sql = `
        INSERT INTO tbl_plataformas(
            nome,
            img)
        VALUES(
            '${plataforma.nome}',
            '${plataforma.img}');`

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

const updatePlataforma = async function (plataforma) {
    try {
        let sql = `UPDATE tbl_plataformas SET
                   nome = '${plataforma.nome}',
                   img = '${plataforma.img}'
                   WHERE id = ${plataforma.id};`

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

const selectByIdPlataforma = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_plataformas WHERE id = ${id};`
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

const selectAllPlataforma = async function () {
    try {
        let sql = `SELECT * FROM tbl_plataformas;`
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

const deletePlataforma = async function (id) {
    try {
        let sql = `DELETE FROM tbl_plataformas WHERE id = ${id};`
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
    insertPlataforma,
    updatePlataforma,
    selectByIdPlataforma,
    selectAllPlataforma,
    deletePlataforma
}