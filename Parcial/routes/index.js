var express = require('express');
var router = express.Router();
let controlador = require("../controladores/indexControllers")

//MULTER 
var multer = require("multer");
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/products");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now())
        }
    }),
})

router.get ('/', controlador.index)
router.get ('/product/:id', controlador.producto)
router.get ('/add', controlador.productoAdd)
router.post("/crear", upload.single("imagen"), controlador.productoCrear)
router.post ('/comentar', controlador.commentAdd)

module.exports = router