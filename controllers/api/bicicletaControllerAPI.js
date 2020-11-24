const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis((err, bicis) => {
        res.status(200).json({
            bicicleta: bicis,
        });
    });
};

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta({
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

exports.bicicleta_update = (req, res) => {
    const bici={
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };

    Bicicleta.findByIdAndUpdate(bici._id, bici, function(err, update) {
        if (err){ res.status(500) }
        else{
            res.status(200).json({
                bici: bici
            });
        };
    });
};

exports.bicicleta_delete = function (req, res) {
    Bicicleta.removeByCode(req.body._id, function(err, dBici){
        if(err) { res.status(500) }
        res.status(204).send();
    });
};
