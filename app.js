const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // authorise les domaines et sous-domaines a send requete a l API

const app = express();
const path = require('path');
// method pour utliser swagger pour la doc :
/*const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs' , swaggerUi.serve, swaggerUi.setup(swaggerDocument));*/
//fin de la methode swagger


// connection a mongo :
const mongodb = require('./db/mongodb');

mongodb.initClientDbConnection();

const indexRouter = require('./routes/index');

app.use(cors({
    exposedHeaders : ['Authorization'],
    origin : '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

//si requete sur route inexistante : 
app.use(function(req,res, next) {
    res.statu(404).json({name: 'API', version: '1.0', status:404, message:'not_found'});
});

//Middlewares pour le traitements des erreurs global
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send("une erreur s'est produite");
});


module.exports = app;
