const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.post('/newsong', (req, res, next) => {

  const newSong = Song({ notes: req.body });
  return newSong.save()
    .then(() => {
      res.status(201).json(newSong);
    })
    .catch(next);
});

module.exports = router;
