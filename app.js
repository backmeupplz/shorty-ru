const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const hjs = require('hogan-express');
const i18n = require("i18n-express");

mongoose.connect('mongodb://localhost:27017/shorty');
mongoose.Promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models'))
  .forEach((filename) => {
    require(path.join(__dirname, '/models/', filename));
  });

const index = require('./routes/index');
const address = require('./routes/address');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hjs', hjs);
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['en', 'ru'],
  textsVarName: 'texts',
}));

app.use('/', index);
app.use('/address', address);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status: err.status,
  });
});


module.exports = app;
