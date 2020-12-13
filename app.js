require('newrelic');
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

//traer passport y express session y definimos el store del motor de sesion que vamos a usar
const passport = require('./config/passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// rutas a la carpeta rutas que contiene el link a los controles.
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarioRoute');
var tokenRouter = require('./routes/tokenRoute');
var bicicletaRouter = require('./routes/bicicletasRoute');
const loginRouter = require('./routes/loginRoute');
var bicicletaAPIRouter = require('./routes/api/bicicletaRouteAPI');
var usuarioAPIRouter = require('./routes/api/usuarioRouteAPI');
var authAPIRouter = require('./routes/api/authRouteAPI');
const authGoogleRouter = require('./routes/authGoogleRoute');
const authFacebookRouter = require('./routes/authFacebookRoute');

// guardamos la sesion en memoria para uso local, en mongoDB para produccion.
let store;
if(process.env.NODE_ENV === 'development') {
    store = new session.MemoryStore;
} else {
    store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions'
    });
    store.on('error', function(error){
        assert.ifError(error);
        assert.ok(false);
    });
}

let app = express();
//definimos la session que está usando
app.use(
    session({
        cookie: { maxAge: 240 * 60 * 60 * 1000 }, // duracion de la cookie
        store: store, // store que definimos
        saveUninitialized: true,
        resave: 'true',
        secret: 'red_bicis!!!**!"!"!*"!..123321', // encriptacion de identificador de la cookie
    })
);

//definimos la secret key para la autenticación
app.set('secretKey', 'jwt_pwd_!!223344');

// traer base de datos a app.js
var mongoose = require('mongoose');
const { assert } = require('console');

// variable de ambiente a la DB.
var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }); // parser para garantizar compatibilidad con versiones nuevas de mongoose
mongoose.Promise = global.Promise; // creo que esto habilita el uso de promesas en mongoose
var db = mongoose.connection; // guardamos la conexion en db
db.on('error', console.error.bind(console, 'MongoDB connection error: ')); // marcamos el evento en caso de error

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//agregando los middleware de passport a la app
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/usuarios', loggedIn, usuariosRouter);
app.use('/token', tokenRouter);
app.use('/bicicletas', loggedIn, bicicletaRouter);
app.use('/login', loginRouter);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.use('/api/auth', authAPIRouter);
app.use('/api/bicicletas', validarUsuario, bicicletaAPIRouter);
app.use('/api/usuarios', usuarioAPIRouter);

app.use('/privacy_policy', function(req, res){
    res.sendFile('/public/privacy_policy.html', {root: '.'});
});

app.use('/googlec8d9bc0769164fde.html', function(req, res){
    res.sendFile('/public/googlec8d9bc0769164fde.html', {root: '.'});
});

app.use('/auth/google', authGoogleRouter);
app.use('/auth/facebook', authFacebookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//agregar nueva funcion de chequeo de login
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        console.log('user sin loguearse');
        res.redirect('/login');
    }
}

function validarUsuario(req, res, next) {
    jwt.verify(
        req.headers['x-access-token'],
        req.app.get('secretKey'),
        function (err, decoded) {
            if (err) {
                res.json({ status: 'error', message: err.message, data: null });
            } else {
                req.body.userId = decoded.id;

                console.log('jwt verify: ' + decoded);

                next();
            }
        }
    );
}

module.exports = app;
