const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const User = mongoose.model('User', userSchema);

module.exports = User;