/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Filme
 * Data 15/04/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/

//Import da biblioteca para gerenciar o banco de dados MySql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão ocm o BD mySql

const knexConfig = require ('../../database_config_knex/knexFile.js')

//Criar a conexão com o bBD MySql
const knexConex = knex(knexConfig.development)

//Funçao para Inserir dados na tabela de filme
const insertFilme = async function(filme){

    try {
    
        let sql = `
                        insert into tbl_filme(
                            nome,
                            data_lancamento,
                            duracao,
                            sinopse,
                            avaliacao,
                            valor,
                            capa,
                            id_classificacao
                            )
                            values (
                            '${filme.nome}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.sinopse}',
                            if('${filme.avaliacao}' = '', null ,'${filme.avaliacao}'),
                            '${filme.valor}',
                            '${filme.capa}',
                            ${filme.id_classificacao}
                            );`

        //executar o ScriptSQL no Banco de dados                    
        let result = await knexConex.raw(sql)
          if(result)
        return result[0].insertId // Retorna o ID gerado no BD
          else
        return false

    } catch (error) {
        //console.log(error)
        return false
    }
    
}

//Funçao para Atualizar um filme existente na tabela
const updateFilme = async function(filme){
    try { 
      let sql = `UPDATE tbl_filme SET
                    nome                    =  '${filme.nome}',
                    data_lancamento         = '${filme.data_lancamento}',
                    duracao                 = '${filme.duracao}',
                    sinopse                 = '${filme.sinopse}',
                    avaliacao               = IF('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                    valor                   = '${filme.valor}',
                    capa                    = '${filme.capa}',
                    id_classificacao        = ${filme.id_classificacao}
                 WHERE id                   = ${filme.id};`
  
      let result = await knexConex.raw(sql)
  
      if(result){
        return true
      } else {
        return false
      }
  
    } catch (error) {
      return false       
    }
  }

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){

    try {
        // script para retornar todos os filmes 
        let sql = `select * from tbl_filme order by id desc`

        //Executa no banco de dados o script SQL para retornar os filmes
        let result = await knexConex.raw(sql)

        //Validção para vereficar se o retorno no BD é um array
        //Se o scriptSQL der erro, o banco devolve um array
        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
            return false
    }   
} // Retorno funcionando

// Função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function(id){
    try {
        let sql = `select * from tbl_filme where id=${id}`
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

//Função para excluir um filme pelo id
const deleteFilme = async function(id){

    console.log(id)
    try {
         let sql = `delete from tbl_filme where id = ${id};`
         console.log(sql)
         let result = await knexConex.raw(sql)

    if(result){
        return result
    }else{
        return true
    }
     } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    insertFilme, updateFilme,
    selectAllFilme, selectByIdFilme,
    deleteFilme
}