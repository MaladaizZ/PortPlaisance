const express = require('express');
const router = express.Router();
const catways = require('../services/catways');
const private = require('../middlewares/privates');
const reservationsRouter = require ('./reservations');


// mise en place du CRUD 

router.get('/:id',private.checkJWT, catways.getById);

router.post('/add', catways.add);

router.patch('/:id',private.checkJWT, catways.update);

router.delete('/:id',private.checkJWT, catways.delete);

//methode pour utiliser les router catway/:id/reservation :
router.use('/:id/reservations', reservationsRouter);

module.exports = router;
