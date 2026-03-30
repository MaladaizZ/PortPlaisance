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
    enum: ['long', 'short'], // seules valeurs autorisées
    required: [true, 'Le type de catway est requis']
  },
  catwayState: {
    type: String,
    trim: true,
    required: [true, "L'état du catway est requis"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Catway', Catway);