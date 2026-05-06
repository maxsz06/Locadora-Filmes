/************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela Filme
 * Data 06/05/2026
 * Autor : Maxwillian
 * Versão :1.0
**************************************************************************************/
//Import da biblioteca para gerenciar o banco de dados MySql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão ocm o BD mySql

const knexConfig = require ('../../database_config_knex/knexFile.js')

//Criar a conexão com o bBD MySql
const knexConex = knex(knexConfig.development)

const  insetClassificacao = async function (classificacao){ // Função para inserir dados na tabela de classificação

    try {
        let sql= `
        insert into tbl_classificacao(
	            descricao_indicativa,
                idade)
         values(
          '${classificacao.descricao_indicativa}',
          '${classificacao.idade}'
           ); `  
        let result  = await knexConex.raw(sql) 
        if(result)
          return true
        else
          return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insetClassificacao,
}

