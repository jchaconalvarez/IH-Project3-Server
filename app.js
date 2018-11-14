const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => (console.log('CONNECTED!')))
  .catch((error) => (console.log(error)));

const app = express();

// const corsOriginURI = app.get('env') === 'development'
//   ? process.env.FRONTEND_DEVELOPMENT_URI : process.env.FRONTEND_PRODUCTION_URI;

const environment = app.get('env') === 'development' ? 'development' : 'production';
console.log('ENVIRONMENT: ', environment);

app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_PRODUCTION_URI]
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const authRouter = require('./routes/auth');
const songRouter = require('./routes/song');
const profileRouter = require('./routes/profile');

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: process.env.MONGODB_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouter);
app.use('/song', songRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.statusMessage });
});

module.exports = app;
