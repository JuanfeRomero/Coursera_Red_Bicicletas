var express = require("express");
var router = express.Router();
var bicicletaControllerAPI = require("../../controllers/api/bicicletaControllerAPI");
const { bicicleta_create_get } = require("../../controllers/bicicleta");

router.get("/", bicicletaControllerAPI.bicicleta_list);
router.post("/create", bicicletaControllerAPI.bicicleta_create);
router.patch("/update", bicicletaControllerAPI.bicicleta_update);
router.delete("/delete", bicicletaControllerAPI.bicicleta_delete);

module.exports = router;
