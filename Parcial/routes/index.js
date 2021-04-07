var express = require('express');
var router = express.Router();

let controlador = require("../controladores/indexControllers")


router.get ('/', controlador.index)
//router.get ('/product/:id', controlador.producto)
//router.get ('/product/add', controlador.productoAdd)

module.exports = router