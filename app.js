var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletaRouter = require('./routes/bicicletas');
var bicicletaAPIRouter = require('./routes/api/bicicletaRouteAPI');
var usuarioAPIRouter = require('./routes/api/usuarioRouteAPI');

var app = express();

// traer base de datos a app.js
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost/red_bicicletas'; // variable con la conexion, el nombre red_bicicletas podria ser cualquier otro
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }) // parser para garantizar compatibilidad con versiones nuevas de mongoose
mongoose.Promise = global.Promise;  // creo que esto habilita el uso de promesas en mongoose
var db = mongoose.connection;  // guardamos la conexion en db
db.on('error', console.error.bind(console, 'MongoDB connection error: ')); // marcamos el evento en caso de error



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletaRouter);
app.use('/api/bicicletas', bicicletaAPIRouter);
app.use('/api/usuarios', usuarioAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
