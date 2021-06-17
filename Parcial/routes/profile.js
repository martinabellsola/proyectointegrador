var express = require('express');
var router = express.Router();
var multer = require("multer");
let controlador = require("../controladores/profileControllers")

//MULTER
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/usuarios");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now())
        }
    }),
})

router.get('/:id', controlador.profile)
router.get('/edit/:id', controlador.edit)
router.post('/edit',  upload.single("imagen"), controlador.editProfile)
router.post('/borrarPerfil', controlador.eliminarPerfil)
router.get('/borrarPerfil/:id', controlador.eliminarPerfilVista)



module.exports = router
