/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela de relção entre filme e Genero
 * Data 22/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require ('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)


const insertFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `
        INSERT INTO tbl_filme_genero(
            id_filme,
            id_genero)
        VALUES(
            ${filmeGenero.id_filme},
            ${filmeGenero.id_genero}
            );`

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

const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero SET
                   id_filme = ${filmeGenero.id_filme},
                   id_genero = ${filmeGenero.id_genero}

                   WHERE id = ${filmeGenero.id}`

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

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_filme_genero WHERE id = ${id};`
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

const selectAllFilmeGenero = async function () {
    try {
        let sql = `SELECT * FROM tbl_filme_genero ORDER BY id DESC;`
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
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = `select tbl_filme.*
                   from  tbl_filme
                        inner join tbl_filme_genero
                          on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                          on tbl_genero.id = tbl_filme_genero.id_genero  
             where tbl_genero.id =${idGenero}` 
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
const selectGenerosByIdFIlmes = async function (idFilme) {
    try {
        let sql = `select tbl_genero.*
                   from  tbl_filme
                        inner join tbl_filme_genero
                          on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                          on tbl_genero.id = tbl_filme_genero.id_genero  
             where tbl_filme.id =${idFilme}` 
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

const deleteFilmeGenero = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id};`
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
    insertFilmeGenero,
    updateFilmeGenero,
    selectByIdFilmeGenero,
    selectAllFilmeGenero,
    deleteFilmeGenero,

    selectGenerosByIdFIlmes,
    selectFilmesByIdGenero
}