var mongoose = require('mongoose'); // llamamos a mongoose;
var Schema = mongoose.Schema; // llamamos al schema;

var bicicletaSchema = new Schema({
    // nombre de modelo con schema
    code: Number, // no le ponemos ID porque id es una palabra reservada por mongoDB
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }, //ubicacion es de tipo array de numero, y creamos un indice de tipo '2dsphere' que es un dato de tipo geografico. sparse indica como va a implementarse el indice
    },
});

bicicletaSchema.statics.createInstance = function (
    //esto crea una instancia del schema y nos devuelve un nuevo objeto creado, por ejemplo al invocar bicicleta.createInstance
    code,
    color,
    modelo,
    ubicacion
) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion,
    });
};

bicicletaSchema.methods.toString = function () {
    return `code: ${this.code} | color: ${this.color}`;
};

bicicletaSchema.statics.allBicis = function (cb) {
    // cb = callback
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function (aBici, cb) {
    return this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = async function(aCode, cb) {
    return this.findOne({code: aCode}, cb);
}

bicicletaSchema.statics.updateByCode = function (aCode, aBici, cb) {
    return this.updateOne({ code: aCode}, aBici, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb) {
    return this.deleteOne({code: aCode}, cb);
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);

// Bicicleta.allBicis = []; //supongo que es para guardar todas las bicicletas provisionalmente,
// Bicicleta.add = function (aBici) {
//     Bicicleta.allBicis.push(aBici);
// };

// Bicicleta.findById = function (aBiciId) {
//     var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);
//     if (aBici) return aBici;
//     else throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
// };

// Bicicleta.removeById = function (aBiciId) {
//     for (var i = 0; i < Bicicleta.allBicis.length; i++) {
//         if (Bicicleta.allBicis[i].id == aBiciId) {
//             Bicicleta.allBicis.splice(i, 1);
//             break;
//         }
//     }
// };

// // var a = new Bicicleta(1, "rojo", "urbana", [-34.6012424, -58.3861497]);
// // var b = new Bicicleta(2, "blanca", "urbana", [-34.596932, -58.3861497]);

// // Bicicleta.add(a);
// // Bicicleta.add(b);

// module.exports = Bicicleta;
