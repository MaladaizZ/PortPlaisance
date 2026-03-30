const Reservation = require('../models/reservation');

// Get toutes les reservations d'un catway
exports.getAll = async (req, res, next) => {
    const catwayNumber = req.params.id ;
    try {
        let reservations = await Reservation.find({ catwayNumber: catwayNumber});
        return res.status(200).json(reservations);
        } catch(error) {
            return res.status(501).json('aucune reservations');
        }
};

// recuperer une résa par id :
exports.getById = async (req, res, next) => {
    const idReservation = req.params.idReservation; 
    try {
        let reservation = await Reservation.findById(idReservation);
        if (reservation) {
            return res.status(200).json(reservation);
        }
        return res.status(401).json('reservation_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};


//Post crée une resa
exports.add = async(req, res, next) => {
    const temp = {
        catwayNumber: req.params.id,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        startDate : req.body.startDate,
        endDate : req.body.endDate
    };
    try {
        let reservation = await Reservation.create(temp);
        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(501).json(error);
    }
};


// Put modifier une resevation 
exports.update = async (req, res, next) => {
    const idReservation = req.params.idReservation;
    const temp = {
        clientName: req.body.clientName,
        boatName : req.body.boatName,
    };
    try {
        let reservation = await Reservation.findById(idReservation);
        if (reservation) {
            Object.keys(temp).forEach((key)=>{
                if(!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });
            await reservation.save();
            return res.status(200).json(reservation);
        } 
        return res.status(404).json('reservation_pas_trouver')
    } catch (error){
        return res.status(501).json(error);
    }
};

// Delete une résa
exports.delete = async(req, res, next) => {
    const idReservation = req.params.idReservation;
    try {
        await Reservation.deleteOne({_id: idReservation});
        return res.status(204).json('reservation_supprimer');
    } catch (error) {
        return res.status(501).json(error)
    }
};