const express = require('express');
const router = express.Router();
const userRouter = require('../routes/users')
const Reservation = require('../models/reservation');
const User = require('../models/user');
const Catway = require('../models/catway');
const service = require('../services/users');        // pour le login
const private = require('../middlewares/privates');





router.get('/', (req, res) =>{
   return res.render('index', {
        title : 'Capitainerie - acueill',
        user : null ,
        error: null
    });
});

//contient les routes propres aux users : 
router.use('/users', userRouter);

// route pour le dashboard :
router.get('/dashboard', async (req, res) => {
    try {
          return res.render('dashboard', {});
    }
   catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Page Catways
router.get('/catways', private.checkJWT, async (req, res) => {
  try {
    const catways = await Catway.find();
    return res.render();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Page Réservations
router.get('/reservations', private.checkJWT, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.render();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Page Utilisateurs
router.get('/users-page', private.checkJWT, async (req, res) => {
  try {
    const users = await User.find();
    return res.render();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
