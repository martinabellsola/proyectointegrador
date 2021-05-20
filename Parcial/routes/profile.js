var express = require('express');
var router = express.Router();
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

let controlador = require("../controladores/profileControllers")

router.get ('/:id', controlador.profile)
router.get ('/edit', controlador.edit)
router.post ('/edit', upload.single("imagen"), controlador.editProfile)



module.exports = router
