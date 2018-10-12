const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { isLoggedIn } = require('../helpers/isLoggin');

router.get('/login', (req, res, next) => {
  if(req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({
      error: 'not found'
    })
  }
})

router.post('/login', (req, res, next) => {
  if(req.session.currentUser) {
    return res.status(401).json({
      error: 'unauthorized'
    });
  }

  const { email, password } = req.body;

  User.findOne({
    email
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: 'not-found'
        });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      }
      return res.status(404).json({
        error: 'not-found'
      });
    })
    .catch(next);
})

router.post('/signup', (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(422).res.json({
      error: 'empty'
    });
  }

  User.findOne({
    email
  }, 'email')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({
          error: 'email-not-unique'
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        email,
        password: hashPass,
      });

      return newUser.save().then(() => {
        req.session.currentUser = newUser;
        res.json(newUser);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

router.get('/profile', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
