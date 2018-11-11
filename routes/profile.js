const express = require('express');
const router = express.Router();

const Users = require('../models/user');

// READ
router.get('/getProfile', (req, res, next) => {
  const { _id: userId } = req.session.currentUser;
  Users.findById(userId)
    .then((user) => {
      res.status(200).json(user);
    });
})

// EDIT
router.put('/:id', (req, res, next) => {
  const { _id: userId } = req.session.currentUser;
  const { email } = req.body;
  Users.findByIdAndUpdate( userId, { email })
    .then((user) => {
      res.status(200).json(user)
    })
})

module.exports = router;
