const express = require('express');
const router = express.Router();

const Songs = require('../models/song');
const Users = require('../models/user')

// CREATE
router.post('/newsong', (req, res, next) => {
  const { songName, noteHistory } = req.body;
  const newSong = Songs({ songName, noteHistory });
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
  const { _id: userId } = req.session.currentUser;
  Users.findById(userId).populate('songs')
    .then((user) => {
      res.status(200).json(user.songs);
    });
});

router.get('/:id', (req, res, next) => {
  const { id: songId } = req.params;

  Songs.findById(songId)
    .then((song) => {
      res.status(200).json(song);
    })
});

// UPDATE
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { songName, noteHistory } = req.body;
  Songs.findByIdAndUpdate(id, { songName, noteHistory })
    .then((song) => {
      res.status(200).json(song);
    });
});

// DELETE
router.delete('/:id', (req, res, next) => {
  const { id: songId } = req.params;
  const { _id: userId } = req.session.currentUser;
  Songs.findByIdAndRemove(songId)
  .then(() => {
    Users.findByIdAndUpdate(userId, { $pull: { songs: songId } });
    res.status(200);
    })
});

module.exports = router;
