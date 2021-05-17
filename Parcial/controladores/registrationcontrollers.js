var usuarios= require("../data/users")
const bcrypt = require('bcryptjs')
const db = require("../database/models")

const controlador = { 
  register: (req, res, next)=>{
    res.render("register", {usuarios:usuarios})
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
     res.redirect ('/');
    })
  }  
}

module.exports = controlador