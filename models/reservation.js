const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber : {
        type : Number,
        required: [true, ' le numero de catway est requis']
    },
    clientName : {
        type : String,
        trim: true,
        required: [true, ' le nom du client est requis']
    },
    boatName: { 
        type: String,
        trim: true,
        required: [true, 'le nom du bateau est requis']
    },
    startdate : {
        type: Date,
        required: [true,'date de debut requis']
    },
    endDate : {
        type: Date,
        required : [true, 'date de fin requis']
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);