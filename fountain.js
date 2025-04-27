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
// backend/routes/fountains.js
const express = require('express');
const Fountain = require('../models/fountain');
const router = express.Router();

// Get all fountains
router.get('/', async (req, res) => {
  try {
    const fountains = await Fountain.find();
    res.json(fountains);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update fountain status
router.put('/:id', async (req, res) => {
  try {
    const fountain = await Fountain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fountain);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
