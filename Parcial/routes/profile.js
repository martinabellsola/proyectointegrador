var express = require('express');
var router = express.Router();

let controlador = require("../controladores/profileControllers")

router.get ('/', controlador.profile)


module.exports = router