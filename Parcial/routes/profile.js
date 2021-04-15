var express = require('express');
var router = express.Router();

let controlador = require("../controladores/profileControllers")

router.get ('/:id', controlador.profile)
router.get ('/edit', controlador.edit)


module.exports = router
