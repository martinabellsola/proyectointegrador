var express = require('express');
var router = express.Router();

let controlador = require("../controladores/logincontrollers")

router.get ('/', controlador.login)


module.exports = router