const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // authorise les domaines et sous-domaines a send requete a l API
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')


// method pour utliser swagger pour la doc :
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs' , swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//fin de la methode swagger


// connection a mongo :
/*const mongodb = require('./db/mongo');
mongodb.initClientDbConnection();*/ 

// mongo local :
mongoose.connect('mongodb://localhost:27017/PortPlaisance', {})
.then(()=> console.log('Connecté Avec Succes'))
.catch((err)=> console.error('Connection ratey :', err));
 






app.use(cors({
    exposedHeaders : ['Authorization'],
    origin : '*'
}));

app.use(logger('dev'));
app.use(express.json());// pour lire le json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// pour avoir view en front : 
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));


//methode pour les routes : 
app.use('/', indexRouter);
app.use('/users', usersRouter)

//si requete sur route inexistante : 
app.use(function(req,res, ) {
    res.status(404).json({name: 'API', version: '1.0', status:404, message:'routes_not_found_mon_ami'});
});

//Middlewares pour le traitements des erreurs global
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send("une erreur s'est produite");
});



module.exports = app;

