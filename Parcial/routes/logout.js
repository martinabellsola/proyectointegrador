var express = require('express');
var router = express.Router();

let controlador = require("../controladores/loginControllers")


router.get('/',controlador.logout)


module.exports = router
