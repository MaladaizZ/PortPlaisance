const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const User = new Schema({
    name: {
        type: String,
        trim : true,
        require: [true, 'Le nom est requis']
    },
    firstname : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true,
        required : [true, 'le mail est requis'],
        unique : true ,
        lowercase : true
    },
    password : {
        type : String,
        trim : true,
    }
},{
    timestamps : true
});

//hash le mot de passe quand il est modifié :

User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next ()
    }
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User' , User);