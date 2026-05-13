/***********************************************************************************************
 *  Objetivo: Arquivo responsavel pela validação,tratamento e mainipulação de dados
 *            para o CRUD de classificação
 *  Data 06/05/2026
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 **********************************************************************************************/

const configMessages = require("../modulo/configMessages");
const sexoDAO = require("../../model/DAO/sexo/sexo.js");
const { json } = require("body-parser");

const inserirSexo = async function (sexo, contentType) {
    let message = JSON.parse(JSON.stringify(configMessages))
    try {
        if (String(contentType).toUpperCase() == "APPLICATION/JSON".toUpperCase()) {
            let dadoValido = await validarDados(sexo);
            if (dadoValido) {
                return dadoValido; // 400
            } else {
                let result = await sexoDAO.insertSexo(sexo);
                if (result) {
                    sexo.id = result
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATED_ITEM.status;
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATED_ITEM.message;
                    message.DEFAULT_MESSAGE.response = sexo
                } else {
                    return message.ERROR_INTERNAL_SEVER_MODEL; // 500 (MODEL)
                }
                return message.DEFAULT_MESSAGE;
            }
        } else {
            return message.ERROR_CONTENT_TYPE; //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_CONTROLER; // 500 (CONTROLER)
    }
};

const validarDados = async function (sexo) {
    let message = JSON.parse(JSON.stringify(configMessages));

    if (sexo.genero == undefined || sexo.genero == null || sexo.genero == "" || sexo.genero > 25) {
        message.ERROR_BAD_REQUEST.field = "[SEXO-Genero] INVÁLIDA-NULA";
        return message.ERROR_BAD_REQUEST;
    } else if (sexo.sigla == undefined || sexo.sigla == null || sexo.sigla == "" || sexo.sigla > 2) {
        message.ERROR_BAD_REQUEST.field = "[SEXO-Sigla] INVÁLIDA-NULA";
        return message.ERROR_BAD_REQUEST;
    } else {
        return false;
    }
};

module.exports={
    inserirSexo
}