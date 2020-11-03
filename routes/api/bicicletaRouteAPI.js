var express = require('express');
var router = express.Router();
var bicicletaControllerAPI = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletaControllerAPI.bicicleta_list);
router.post('/create', bicicletaControllerAPI.bicicleta_create)

module.exports = router;