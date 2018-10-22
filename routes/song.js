const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.post('/newsong', (req, res, next) => {
  const { songName, noteHistory } = req.body;
  const newSong = Song({ songName, noteHistory });
  return newSong.save()
    .then(() => {
      res.status(201).json(newSong);
    })
    .catch(next);
});

module.exports = router;
