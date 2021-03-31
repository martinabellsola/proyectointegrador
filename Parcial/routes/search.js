var express = require('express');
var router = express.Router();

let controlador = require("../controladores/searchcontrollers")


router.get ('/', controlador.search)

module.exports = router