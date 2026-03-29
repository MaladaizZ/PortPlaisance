const Catway = require('../models/catway');

// GET par id
exports.getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        let catway = await Catway.findById(id);
        if (catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

// GET tous les catways
exports.getAll = async (req, res, next) => {
    try {
        let catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(501).json(error);
    }
};

// POST créer un catway
exports.add = async (req, res, next) => {
    const temp = {
        catwayNumber: req.body.catwayNumber,
        catwayType:   req.body.catwayType,
        catwayState:  req.body.catwayState
    };
        try {
            let catway = await Catway.findOne({_id : id});
    
            if (user) {
                Object.keys(temp).forEach((key) =>{
                    if (!!temp[key]) {
                        user[key] = temp[key];
                    }
                });
    
                await user.save();
                return res.status(201).json(user);
            }
    
            return res.status(404).json('user_not_found'); 
        } catch (error) {
            return res.status(501).json(error);
        }
    }
    try {
        let catway = await Catway.create(temp);
        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error);
    }
;

// PATCH modifier un catway
exports.update = async (req, res, next) => {
    const id = req.params.id;
    try {
        let catway = await Catway.findById(id);
        if (catway) {
            catway.catwayState = req.body.catwayState || catway.catwayState;
            await catway.save();
            return res.status(200).json(catway);
        }
        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

// DELETE supprimer un catway
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Catway.deleteOne({ _id: id });
        return res.status(204).json('delete_is_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};