const express = require('express');
const router = express.Router();
const userRouter = require('../routes/users')
/*const app = express();*/



/*app.use('/',userRouter )

 GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', async(req, res) =>{
  res.status(200).json({
    name : process.env.APP_NAME,
    version : '1.0',
    status : 200,
    message : 'Bienvenue sur l\'API ! '
  });
});

//contient les routes propres aux users : 
router.use('/users', userRouter);


module.exports = router;
