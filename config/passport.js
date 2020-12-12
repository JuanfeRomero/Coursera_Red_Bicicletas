const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

passport.use(
    new LocalStrategy(function (email, password, done) {
        Usuario.findOne({ email: email }, function (err, usuario) {
            if (err) return done(err);
            if (!usuario)
                return done(null, false, {
                    message: 'El usuario no existe o el email es incorrecto',
                });
            if (!usuario.validPassword(password))
                return done(null, false, {
                    message: 'La contraseña ingresada no es correcta',
                });
            if (!usuario.verificado) {
                usuario.enviar_mail_bienvenida();
                return done(null, false, {
                    message:
                        'Su cuenta no está verificada, por favor revise su correo',
                });
            }

            return done(null, usuario);
        });
    })
);

passport.use(
    new FacebookTokenStrategy(
        {
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        },
        function (accessToken, refreshToken, profile, done) {
            try {
                Usuario.findOrCreateByFacebook(profile, function (err, user) {
                    if (err) return console.log('err: ' + err);
                    return done(err, user);
                });
            } catch (err2) {
                console.log('error antes de crear el usuario: ' + err2);
                return err2, null;
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            Usuario.findOrCreateByGoogle(profile, function (err, user) {
                return done(err, user);
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Usuario.findById(id, function (err, usuario) {
        done(err, usuario);
    });
});

module.exports = passport;
