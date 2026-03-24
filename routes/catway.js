const express = require('express');
const router = express.Router();
const catway = require('../catway/users');
const private = require('../middlewares/privates');

// mise en place du CRUD 

router.get('/:id',private.checkJWT, catway.getById);

router.post('/add', catway.add);

router.patch('/:id',private.checkJWT, catway.update);

router.delete('/:id',private.checkJWT, catway.delete);

// route authenticate
router.post('/authenticate', catway.authenticate);

module.exports = router;
