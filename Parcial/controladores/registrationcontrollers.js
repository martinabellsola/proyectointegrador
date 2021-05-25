const bcrypt = require('bcryptjs')
const db = require("../database/models")

const controlador = { 
  register:  (req,res,next)=>{
    db.Usuario.findAll().then(usuario=>{
       res.render("register", {usuarios:usuario,})
    }).catch(err => {console.log(err)})
  },
  registerCrear: (req, res, next)=>{
    let contraencriptada = bcrypt.hashSync(req.body.contra)
    db.Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nombreUsuario: req.body.usuario,
      contraseña: contraencriptada,
      mail: req.body.correo,
      fechaNacimiento: req.body.nacimiento,
    }).then (usuario =>{
    req.session.usuario = usuario.nombreUsuario,
    req.session.id = usuario.id,
     res.redirect('../profile/' + usuario.id);
    }).catch(err => {console.log(err)})
  }  
}

module.exports = controlador