const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  instrument: String,
  notes: [],
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;