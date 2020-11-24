// mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Reserva = require('./reserva');
//encriptador
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
//token y mailer
const Token = require('../models/token');
const Mailer =require('../mailer/mailer');
//Schema inicializado
var Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // objeto regex, determinando el correcto formato del email.
    return re.test(email);
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true, //elimina los espacios vacios al principio y al final
        required: [true, 'El nombre es obligatorio'], // hacer obligatorio y dar un mensaje en caso que no
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true, //vuelve todo a minuscula al momento de guardar
        unique: true, //esto define el PATH en el uniqueValidator.
        validate: [validateEmail, 'Por favor ingrese un email valido'], // valida el mail por medio de la funcion pasada
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/], // match valida el mail a nivel dato
    },
    password: {
        type: String,
        required: (true, 'El password es obligatorio'),
    },
    // valores preparados para el token.
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false,
    },
});

usuarioSchema.plugin(uniqueValidator, {
    message: 'El {PATH} ya existe con otro usuario',
});

usuarioSchema.pre('save', function (next) {
    // antes de hacer un save en esta base de datos
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function (password) {
    //validar que el password sea el correcto
    return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    var reserva = new Reserva({
        usuario: this._id,
        bicicleta: biciId,
        desde: desde,
        hasta: hasta,
    });
    console.log(reserva);
    reserva.save(cb);
};

usuarioSchema.methods.enviar_mail_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});  //creado el token en memoria
    const email_destination = this.email; // el email que va a recibir el que verifica
    token.save(function(err){
        if (err) {return console.log(err.message);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click en este link: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '\n'
        };

        Mailer.sendMail(mailOptions, function(err){
            if (err) {return console.log(err.message);}

            console.log('Se ha enviado un email de verificacion a ' + email_destination + '.');
        })
    });
}

usuarioSchema.methods.resetPassword = function(cb) {
    const token = new Token ({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    const resetLink = `http://localhost:3000/resetPassword/${token.token}`
    token.save(function (err) {
        if(err) {return cb(err);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: `Hola.
            
            Por favor, para resetear el password de su cuenta haga click en este link: 
            ${resetLink}.
            `
        };

        Mailer.sendMail(mailOptions, function(err){
            if (err) { return cb(err); }

            console.log('Se envio un mail de recuperacion de password a: ' + email_destination + '.');
        });

        cb(null);
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);
