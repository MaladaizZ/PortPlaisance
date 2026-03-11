const User = require('../models/user');

//method pour recup un utilisateur par Id :
exports.getById = async(req, res, next) =>{
    const id = req.params.id
    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}