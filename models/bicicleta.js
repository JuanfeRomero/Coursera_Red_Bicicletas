const mongoose = require('mongoose'); // llamamos a mongoose;
const Schema = mongoose.Schema; // llamamos al schema;

const bicicletaSchema = new Schema({
    // nombre de modelo con schema
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }, //ubicacion es de tipo array de numero, y creamos un indice de tipo '2dsphere' que es un dato de tipo geografico. sparse indica como va a implementarse el indice
    },
});

bicicletaSchema.statics.createInstance = function (//esto crea una instancia del schema y nos devuelve un nuevo objeto creado, por ejemplo al invocar bicicleta.createInstance
    _id, color, modelo, ubicacion ) {
    return new this({
        _id: _id,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion,
    });
};

bicicletaSchema.methods.toString = function () {
    return `code: ${this._id} | color: ${this.color}`;
};

bicicletaSchema.statics.allBicis = function (cb) {
    // cb = callback
    return this.find({}, cb).sort({_id : 'asc'});
};

bicicletaSchema.statics.add = function (aBici, cb) {
    return this.create(aBici, cb);
};

bicicletaSchema.statics.findByCode = function(aCode, cb) {
    return this.findOne({_id: aCode}, cb);
}

bicicletaSchema.statics.removeByCode = function(aCode, cb) {
    return this.deleteOne({_id: aCode}, cb);
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);