const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.post('/newsong', (req, res, next) => {
  const user = req.session.currentUser._id;
  const { songName, noteHistory } = req.body;
  const newSong = Song({ songName, noteHistory, user });
  return newSong.save()
    .then(() => {
      Song.findOne({}).sort({ created_at: -1 })
        .then((newSong) => {
          res.status(201).json(newSong);
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
``
