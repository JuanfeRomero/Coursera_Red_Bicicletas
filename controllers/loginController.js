const Usuario = require('../models/usuario');
const passport = require('../config/passport');

module.exports= {
    login_post: function (req, res, next) {
        passport.authenticate('local', function (err, usuario, info) {
            if (err) return next(err);
            if (!usuario) return res.render('session/login', { info });
            req.login(usuario, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        })(req, res, next); 
    },
    forgotPassword_post: function (req, res) {
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
        })
    },
    create_get : function (req, res) {
        res.render('session/create', {errors:{}, usuario: new Usuario()});
    },
    create_post : function (req, res, next) {
        if(req.body.password != req.body.confirm_password) {
            res.render('session/create', {errors: {confirm_password: {message: "No coinciden las contraseñas!"}}, usuario : new Usuario({nombre: req.body.nombre, email: req.body.email})});
            return;
        }
        Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
        }, function(err, nuevoUsuario){
            if(err) {
                res.render('session/create', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})});
            }else {
                nuevoUsuario.enviar_mail_bienvenida();
                res.render('session/createMessage');
            }
        });
    }
}