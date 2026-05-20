/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Diretor
 * Data 20/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/
 
const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile')
const knexConex = knex(knexConfig.development)
 
const insertDiretor = async function (diretor) {
    try {
        let sql = `
        INSERT INTO tbl_diretor(
            nome,
            data_nascimento,
            biografia,
            foto,
            tipo)
        VALUES(
            '${diretor.nome}',
            '${diretor.data_nascimento}',
            '${diretor.biografia}',
            '${diretor.foto}',
            '${diretor.tipo}');`
 
        let result = await knexConex.raw(sql)
 
        if (result) {
            return result[0].insertId
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
 
const updateDiretor = async function (diretor) {
    try {
        let sql = `UPDATE tbl_diretor SET
                   nome            = '${diretor.nome}',
                   data_nascimento = '${diretor.data_nascimento}',
                   biografia       = '${diretor.biografia}',
                   foto            = '${diretor.foto}',
                   tipo            = '${diretor.tipo}'
                   WHERE id = ${diretor.id};`
 
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
 
const selectByIdDiretor = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_diretor WHERE id = ${id};`
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
 
const selectAllDiretor = async function () {
    try {
        let sql = `SELECT * FROM tbl_diretor ORDER BY id DESC;`
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
 
const deleteDiretor = async function (id) {
    try {
        let sql = `DELETE FROM tbl_diretor WHERE id = ${id};`
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
    insertDiretor,
    updateDiretor,
    selectByIdDiretor,
    selectAllDiretor,
    deleteDiretor
}