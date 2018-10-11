const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  instrument: String,
  notes: [],
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;