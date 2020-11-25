var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

//traer passport y express session y definimos el store del motor de sesion que vamos a usar
const passport = require('./config/passport');
const session = require('express-session');

// rutas a la carpeta rutas que contiene el link a los controles.
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarioRoute');
var tokenRouter = require('./routes/tokenRoute');
var bicicletaRouter = require('./routes/bicicletasRoute');
var bicicletaAPIRouter = require('./routes/api/bicicletaRouteAPI');
var usuarioAPIRouter = require('./routes/api/usuarioRouteAPI');
var authAPIRouter = require('./routes/api/authRouteAPI');

// traemos el usuario y el token para recuperar el password, borrar cuando se muda metodos de login y password a un route separado.
const Usuario = require('./models/usuario');
const Token = require('./models/token');

// guardamos la sesion en memoria, mas agil pero si se resetea el servidor se pierden los datos, tambien se puede guardar en mongoDB
const store = new session.MemoryStore();


var app = express();
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

var mongoDB = 'mongodb://localhost/red_bicicletas'; // variable con la conexion, el nombre red_bicicletas podria ser cualquier otro
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

// esto se puede hacer desde router
app.get('/login', function (req, res) {
    res.render('session/login');
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, usuario, info) {
        if (err) return next(err);
        if (!usuario) return res.render('session/login', { info });
        req.login(usuario, function (err) {
            if (err) return next(err);
            return res.redirect('/bicicletas');
        });
    })(req, res, next);
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/forgotPassword', function (req, res) {
    res.render('session/forgotPassword');
});

app.post('/forgotPassword', function (req, res) {
    Usuario.findOne({ email: req.body.email }, function (err, usuario) {
        if (!usuario) {
            return res.render('session/forgotPassword', {
                info: {
                    message: 'No existe el email para un usuario existente.',
                },
            });
        }
        usuario.resetPassword(function (err) {
            if (err) return console.log(err);
        });
        res.render('session/forgotPasswordMessage');
    });
});

app.get('/resetPassword/:token', function (req, res) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token)
            return res
                .status(400)
                .send({
                    type: 'not-verified',
                    msg:
                        'No existe un usuario asociado al token. Verifique que su token no haya expirado',
                });

        Usuario.findById(token._userId, function (err, usuario) {
            if (!usuario)
                return res
                    .status(400)
                    .send({ msg: 'No existe un usuario asociado al token.' });
            res.render('session/resetPassword', {
                errors: {},
                usuario: usuario,
            });
        });
    });
});

app.post('/resetPassword', function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        res.render('session/resetPassword', {
            errors: {
                confirm_password: {
                    message: 'No coincide con el password ingresado',
                },
            },
            usuario: new Usuario({ email: req.body.email }),
        });
        return;
    }
    Usuario.findOne({ email: req.body.email }, function (err, usuario) {
        usuario.password = req.body.password;
        usuario.save(function (err) {
            if (err) {
                res.render('session/resetPassword', {
                    errors: err.errors,
                    usuario: new Usuario({ email: req.body.email }),
                });
            } else {
                res.redirect('/login');
            }
        });
    });
});


app.use('/', indexRouter);
app.use('/usuarios', loggedIn, usuariosRouter);
app.use('/token', tokenRouter);
app.use('/bicicletas', loggedIn, bicicletaRouter);

app.use('/api/auth', authAPIRouter);
app.use('/api/bicicletas', validarUsuario, bicicletaAPIRouter);
app.use('/api/usuarios', usuarioAPIRouter);

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
