const db = require("../database/models")
const bcrypt = require('bcryptjs')

const controlador = {
  profile: (req, res, next)=>{
    db.Usuario.findByPk(req.params.id).then(usuario=>{
      filtro = {
         where:{ usuarioId : req.params.id }
      }
      db.Producto.findAll(filtro).then( products =>{
        res.render("profile", {usuarios:usuario, products: products})
      })
    }).catch(err => {console.log(err)})
  },

  edit: (req,res,next)=>{
    db.Usuario.findByPk(req.params.id).then(usuario=>{
       res.render("profile-edit", {usuarios:usuario,})
    }).catch(err => {console.log(err)})
  },

  editProfile: (req,res,next)=>{
    let contraencriptada = bcrypt.hashSync(req.body.contra)
    db.Usuario.update({
      nombreUsuario: req.body.usuario,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      mail: req.body.mail,
      contraseña: contraencriptada,
      imagen: req.file.filename
    },{
      where: {id: req.body.id}
    }).then(usuario =>{
      res.redirect("/profile/" + req.body.id)
    }).catch(err => {console.log(err)})
  },
}

module.exports = controlador

