const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de catway est requis'],
        unique: true
    },
    catwayType: {
        type: String,
        enum: ['long', 'short'],
        required: [true, 'Le type est requis']
    },
    catwayState: {
        type: String,
        required: [true, 'L\'état est requis']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);