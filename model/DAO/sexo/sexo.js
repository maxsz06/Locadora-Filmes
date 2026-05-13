/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Filme
 * Data 13/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile')
const knexConex = knex(knexConfig.development)

const insertSexo = async function (sexo) {
    try {
        let sql = `
        insert into tbl_sexo(
            genero,
            sigla)
        values(
            '${sexo.genero}',
            '${sexo.sigla}');`

     let result = await knexConex.raw(sql)
    if(result)
        return result[0].insertId
    else
        return false
    } catch (error) {
        return false 
    }
}

const selectByIdSexo = async function (id) {
    
    try {
        let sql = `select * from tbl_sexo where id=${id}`
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const updateSexo = async function (sexo) {
    try {
        let sql = `
        UPDATE tbl_sexo SET 
        	genero = '${sexo.genero}',
           sigla = '${sexo.sigla}'
        where id =  ${sexo.id};`

        let result = await knexConex.raw(sql)
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports={
    insertSexo,updateSexo,
    selectByIdSexo,
}