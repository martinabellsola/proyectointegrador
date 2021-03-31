var express = require('express');
var router = express.Router();

let controlador = require("../controladores/profilecontrollers")

router.get ('/', controlador.profile)


module.exports = router