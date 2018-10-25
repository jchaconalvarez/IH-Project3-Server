const express = require('express');
const router = express.Router();

const Songs = require('../models/song');
const Users = require('../models/user')

// CREATE
router.post('/newsong', (req, res, next) => {
  const user = req.session.currentUser._id;
  const { songName, noteHistory } = req.body;
<<<<<<< HEAD
  const newSong = Song({ songName, noteHistory, user });
=======
  const newSong = Songs({ songName, noteHistory });
>>>>>>> b46646ac0dbff94a17ddfa57362c823b077e8069
  return newSong.save()
    .then((song) => {
      const { _id: songId } = song;
      const { _id: userId } = req.session.currentUser;
      Users.findByIdAndUpdate(userId, { $push: { songs: songId } })
        .then(() => {
          Songs.findById(songId)
            .then((song) => {
              res.status(201).json(song);
            })
        });
    })
    .catch(next);
});

// READ
router.get('/getusersongs', (req, res, next) => {
  const { _id: userId} = req.session.currentUser;
  console.log(userId);
  Users.findById(userId).populate('songs')
    .then((user) => {
      console.log('POSTPOPULATE: ', user);
      res.status(200).json(user.songs);
    });
});

// UPDATE
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { songName, noteHistory } = req.body;
  console.log('PUTPUT');
  Songs.findByIdAndUpdate(id, { songName, noteHistory })
    .then((song) => {
      console.log('UPDATED');
      res.status(200).json(song);
    });
});

module.exports = router;
