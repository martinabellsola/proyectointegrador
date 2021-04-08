var express = require('express');
var router = express.Router();

let controlador = require("../controladores/searchControllers")


router.get ('/', controlador.search)

module.exports = router