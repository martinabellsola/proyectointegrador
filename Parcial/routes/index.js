var express = require('express');
var router = express.Router();

let controlador = require("../controladores/indexControllers")


router.get ('/', controlador.index)
router.get ('/product/:id', controlador.producto)
router.get ('/add', controlador.productoAdd)
router.post('/crear', controlador.productoCrear)

module.exports = router