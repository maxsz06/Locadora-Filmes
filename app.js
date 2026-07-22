/****************************************************************************************************
 *  Objetivo: Arquivo responsavel pelos End Points da Locadora de Filmes
 *  Autor: Maxwillian Santana
 *  Versão: 1.0
 *****************************************************************************************************/
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
}
app.use(cors(corsOptions))

//----------------------------[END POINTS]-----------------------------

const filmeRouter = require('./routes/filme.routes.js')
app.use('/v1/senai/locadora/filme', cors(corsOptions), filmeRouter)

const classificacaoRouter = require('./routes/classificacao.routes.js')
app.use('/v1/senai/locadora/classificacao', cors(corsOptions), classificacaoRouter)

const sexoRouter = require('./routes/sexo.routes.js')
app.use('/v1/senai/locadora/sexo', cors(corsOptions), sexoRouter)

const atorRouter = require('./routes/ator.routes.js')
app.use('/v1/senai/locadora/ator', cors(corsOptions), atorRouter)

const generoRouter = require('./routes/genero.routes.js')
app.use('/v1/senai/locadora/genero', cors(corsOptions), generoRouter)

const idiomaRouter = require('./routes/idioma.routes.js')
app.use('/v1/senai/locadora/idioma', cors(corsOptions), idiomaRouter)

const diretorRouter = require('./routes/diretor.routes.js')
app.use('/v1/senai/locadora/diretor', cors(corsOptions), diretorRouter)

const plataformaRouter = require('./routes/plataforma.routes.js')
app.use('/v1/senai/locadora/plataforma', cors(corsOptions), plataformaRouter)

//-----------------------------------------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`API DA LOCADORA FUNCIONANDO EM http://localhost:${PORT} E AGUARDANDO NOVAS REQUISIÇÕES...`);
}); 