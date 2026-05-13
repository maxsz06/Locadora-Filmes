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
}

const updateAtor = async function(ator) {
}

const selectByIdAtor = async function (id) {
}

const selectAllAtor = async function () {
}

const deleteAtor = async function(id) {
}


module.exports={
    insertAtor,updateAtor,
    selectByIdAtor,selectAllAtor,
    deleteAtor
}