var mongoose = require('mongoose');
var Reserva = require('./reserva');
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

const saltRounds = 10;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/; // objeto regex, determinando el correcto formato del email.
    return re.test(email);
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: True, //elimina los espacios vacios al principio y al final
        required: [true, 'El nombre es obligatorio'], // hacer obligatorio y dar un mensaje en caso que no
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true, //vuelve todo a minuscula al momento de guardar
        validate: [validateEmail, 'Por favor ingrese un email valido'], // valida el mail por medio de la funcion pasada
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/], // match valida el mail a nivel dato
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
        default: false
    }
});

usuarioSchema.pre('save', function(next){  // antes de hacer un save en esta base de datos
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password) { //validar que el password sea el correcto
    return bcrypt.compareSync(password, this.password);
}

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

module.exports = mongoose.model('Usuario', usuarioSchema);
