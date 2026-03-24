const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

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
};

// callback pour add un user :

exports.add = async (req, res, next) => {
    const temp = ({
        name : req.body.name,
        firstname : req.body.firstname,
        email : req.body.email,
        password : req.body.password 
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
          console.error('ERREUR ADD USER :', error); 
        return res.status(501).json(error);
    }
}

// callback pour modifier un user :

exports.update = async (req, res, next) => {
    const id = req.params.id 
    const temp = ({
        name : req.body.name,
        firtsname : req.body.firstname,
        email : req.body.email,
        password : req.password
    });

    try {
        let user = await User.findOne({_id : id});

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

// callback pour supprimer un user :

exports.delete = async ( req, res, next) => {
    const id = req.params.id

    try {
        await User.deleteOne({ _id : id});

        return res.status(204).json('delete_is_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

//methode pour verifier le mot de passe

exports.authenticate = async ( req, res,)=> {
    const {email, password} =req.body;

    try {
        let user = await User.findOne({email: email}, '-__V -createdAt -updateAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if(err) {
                    throw new Error(error)
                }
                if (response) {
                    delete user._doc.password;
                    
                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });
                    
                    res.header('Authorization', 'Bearer ' + token);

                    return res.status(200).json('authenticate_succeed_my_friend');
                }
                return res.status(403).json('wrong_credentials');
        });
                } else {
                    return res.status(404).json('user_not_found');
                }
            } catch (error) {
                return res.status(501).json(error)
            }
        }


    
