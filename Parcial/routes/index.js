var express = require('express');
var router = express.Router();

let controlador = require("../controladores/indexcontrollers")


router.get ('/', controlador.index)
router.get ('/product', controlador.producto)
router.get ('/product/add', controlador.productoAdd)

module.exports = router