var express = require('express');
var router = express.Router();
const userRoute = require('../routes/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', async(req, res) =>{
  res.status(200).json({
    name : process.env.APP_NAME,
    version : '1.0',
    status : 200,
    message : 'Bienvenue sur l\'API ! '
  });
});

//contient les routes propres aux users : 
router.use('/users', userRoute);


module.exports = router;
