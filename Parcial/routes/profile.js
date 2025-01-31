var express = require('express');
var router = express.Router();
let controlador = require("../controladores/profileControllers")

//MULTER
var multer = require("multer");
var path = require("path");
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/usuarios");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    }),
})

router.get('/:id', controlador.profile)
router.get('/edit/:id', controlador.edit)
router.post('/edit',  upload.single("imagen"), controlador.editProfile)
router.post('/borrarPerfil', controlador.eliminarPerfil)
router.get('/borrarPerfil/:id', controlador.eliminarPerfilVista)
router.post('/follow', controlador.seguir)
router.post('/unfollow', controlador.dejarSeguir)

module.exports = router
