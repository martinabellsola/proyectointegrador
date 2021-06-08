const bcrypt = require('bcryptjs')
const db = require("../database/models")

const controlador = { 
  register:  (req,res,next)=>{
    db.Usuario.findAll().then(usuario=>{
       res.render("register", {usuarios:usuario,})
    }).catch(err => {console.log(err)})
  },
  registerCrear: (req, res, next)=>{
    let contra = req.body.contra
    let contraencriptada = bcrypt.hashSync(contra)
    let errors = {}

    db.Usuario.findOne({where:{mail: req.body.correo}}).then(usuario=>{ 
      
      correoexistente = usuario.mail
      
      if (req.body.correo == '') {
        errors.message = "Porfavor es necesario que ingrese un mail"
        res.locals.errors=errors
        return res.render("register")
      }
    
      else if (correoexistente) {
          errors.message = "El correo que ingresó ya ha sido registrado, porfavor ingrese otro"
          res.locals.errors=errors
          return res.render("register")
      }
      
      else if (req.body.contra == '') {
        errors.message = "Porfavor es necesario que ingrese una contraseña"
        res.locals.errors = errors
        return res.render("register")
      } 
    
      else if ( contra.length <= 4) {
        errors.message = "Porfavor es necesario que la contraseña tenga al menos 4 letras"
        res.locals.errors = errors
        return res.render("register")
      }
    
      else{
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
          })
        }
      });
    }
  }

module.exports = controlador