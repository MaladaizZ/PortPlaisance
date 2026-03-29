const express = require('express');
const router = express.Router({ mergeParams: true});
const service = require('../services/reservations');
const private = require('../middlewares/privates');

router.get('/', private.checkJWT,service.getAll);
router.get('/:idReservation', private.checkJWT, service.getById);
router.post('/', service.add );
router.put('/:idReservation', private.checkJWT, service.update);
router.delete('/:idReservation', private.checkJWT, service.delete);

module.exports= router;