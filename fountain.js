// backend/models/fountain.js
const mongoose = require('mongoose');

const fountainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['working', 'broken'], default: 'working' },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Fountain', fountainSchema);
