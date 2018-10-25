const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  songs: [{ type: ObjectId, ref: 'Song' }],
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;
