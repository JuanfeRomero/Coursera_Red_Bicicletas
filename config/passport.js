const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new LocalStrategy(
    function(email, password, done) {
        Usuario.findOne({email: email}, function(err, usuario){
            if(err) return done(err);
            if(!usuario) return done(null, false, {message: 'El usuario no existe o el email es incorrecto'});
            if(!usuario.validPassword(password)) return done(null, false, {message: 'La contraseña ingresada no es correcta'});
            if(!usuario.verificado) {
                usuario.enviar_mail_bienvenida();
                return done(null, false, {message: 'Su cuenta no está verificada, por favor revise su correo'})
            };
            
            return done(null, usuario);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Usuario.findById(id, function(err, usuario){
        done(err, usuario);
    });
});

module.exports = passport;