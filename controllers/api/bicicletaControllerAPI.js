var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis((err, bicis) => {
        res.status(200).json({
            bicicleta: bicis,
        });
    });
};

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta({
        code: req.body.id,
        color: req.body.color,
        modelo: req.body.modelo,
    });
    bici.ubicacion = [req.body.ubicacion[0], req.body.ubicacion[1]];

    Bicicleta.add(bici, function (err, newBici) {
        res.status(200).json({
            bicicleta: newBici,
        });
    });
};

exports.bicicleta_update = function (req, res) {
    Bicicleta.allBicis((err, bic) => {
        console.log('otra' + bic);
    })
    const code = req.params.code;
    const bici = Bicicleta.findByCode(code);
    if(bici){
        bici.code = req.body.code ? req.body.code : bici.code;
        bici.color = req.body.color ? req.body.color : bici.color;
        bici.modelo = req.body.modelo ? req.body.modelo : bici.modelo;
        bici.ubicacion = req.body.ubicacion ? [req.body.ubicacion] : bici.ubicacion;

        Bicicleta.updateByCode(code, bici, (err, filasRes) =>{
            res.status(200).json({
                bicicleta: bici,
            });
        });
    }
};

exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeByCode(req.body.code, function(err, dBici){
        res.status(204).send();
    });
};
