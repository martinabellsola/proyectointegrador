var express = require('express');
var router = express.Router();

let controlador = require("../controladores/loginControllers")

router.get ('/', controlador.login)
router.post('/', controlador.validacion)

module.exports = router
