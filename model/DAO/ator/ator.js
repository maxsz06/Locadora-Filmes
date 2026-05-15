/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Filme
 * Data 13/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

const knex = require('knex')
const knexConfig = require ('../../database_config_knex/knexFile.js')
const knexConex = knex(knexConfig.development)

const insertAtor = async function (ator) {
    try {
        let sql = `
        INSERT INTO tbl_ator(
            nome,
            data_nascimento,
            biografia,
            foto)
        values(
            '${ator.nome}',
            '${ator.data_nascimento}',
            '${ator.biografia}',
            '${ator.foto}');`
        
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

const updateAtor = async function(ator) {
    try {
        let sql = `UPDATE tbl_ator SET
                   nome = '${ator.nome}',
                   data_nascimento = '${ator.data_nascimento}',
                   biografia = '${ator.biografia}',
                   foto = '${ator.foto}'
                   WHERE id = ${ator.id};  
        `
        let result = await knexConex.raw(sql)
        
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async function (id) {
    try {
        let sql = `SELECT * FROM tbl_ator WHERE id = ${id};`
        let result = await knexConex.raw(sql)
 
            if(Array.isArray(result)){
                  return result[0]  
            }else{
                return false
            }
    } catch (error) {
        return false
    }
}

const selectAllAtor = async function () {
    try {
        let sql = `SELECT * FROM tbl_ator AS des;`
           let result = await knexConex.raw(sql)
           if(Array.isArray(result)){
               return result[0]
           }else{
               return false
           }
       } catch (error) {
           return false
       }
}

const deleteAtor = async function(id) {
    try {
        let sql = `delete from tbl_ator where id = ${id};`
        let result = await knexConex.raw(sql)
 
     if(result){
         return result
     }else{
       return true
     }
    } catch (error) {
        return false
    }
}


module.exports={
    insertAtor,updateAtor,
    selectByIdAtor,selectAllAtor,
    deleteAtor
}