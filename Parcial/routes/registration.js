var express = require('express');
var router = express.Router();

let controlador = require("../controladores/registrationcontrollers")

router.get ('/', controlador.registration)

module.exports = router