const express = require('express');
const router = express.Router();

const Song = require('../models/song');

router.get('/play', function (req, res, next) {
  if(err){
    next(err)
  } else {
    res.status(200).json();
  }
});

router.post('/play', function (req, res, next) {
  const newSong = new Song({
    user: req.session.currentUser,
    name: req.body.name,
    instrument: req.body.instrument,
    notes: req.body.notes,
  });

  newSong.save((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ song: newSong });
    }
  });
});

module.exports = router;