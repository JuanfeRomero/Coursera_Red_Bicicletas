var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicletaController');

router.get('/', bicicletaController.bicicleta_list);
router.get('/:_id/show', bicicletaController.bicicleta_show_get);
router.get('/create', bicicletaController.bicicleta_create_get);
router.post('/create', bicicletaController.bicicleta_create_post);
router.get('/:_id/update', bicicletaController.bicicleta_update_get);
router.post('/:_id/update', bicicletaController.bicicleta_update_post);
router.post('/:_id/delete', bicicletaController.bicicleta_delete_post); //:code elige el parametro 

module.exports = router;