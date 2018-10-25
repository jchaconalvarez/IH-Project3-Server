const express = require('express');
const router = express.Router();

const Song = require('../models/song');
const User = require('../models/user')

router.post('/newsong', (req, res, next) => {
  const { songName, noteHistory } = req.body;
  const newSong = Song({ songName, noteHistory });
  return newSong.save()
    .then((song) => {
      const { _id: songId } = song;
      const { _id: userId } = req.session.currentUser;
      User.findByIdAndUpdate(userId, { $push: { songs: songId } })
        .then(() => {
          Song.findById(songId)
            .then((song) => {
              res.status(201).json(song);
            })
        });
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { songName, noteHistory } = req.body;
  Song.findByIdAndUpdate(id, { songName, noteHistory })
    .then((song) => {
      res.status(200).json(song);
    });
});

module.exports = router;
