var express = require('express');
var router = express.Router();

let controlador = require("../controladores/registrationControllers")

router.get ('/', controlador.register)

router.post ('/', controlador.registerCrear)

module.exports = router