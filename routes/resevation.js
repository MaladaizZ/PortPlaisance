const express = require('express');
const router = express.Router();
const reservation = require('../reservation/users');
const private = require('../middlewares/privates');

// mise en place du CRUD 

router.get('/:id',private.checkJWT, reservation.getById);

router.post('/add', reservation.add);

router.patch('/:id',private.checkJWT, reservation.update);

router.delete('/:id',private.checkJWT, reservation.delete);

// route authenticate
router.post('/authenticate', reservation.authenticate);

module.exports = router;
