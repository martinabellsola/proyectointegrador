let db = require('../database/models')
const bcrypt= require('bcryptjs')

const controlador = {   
  login: (req, res, next)=>{
      res.render("login")
  },

  validacion:(req, res, next)=>{
    let errors = {}

    const filtro = {
      where: {nombreUsuario: req.body.nombreUsuario }
    }
    db.Usuario.findOne(filtro).then(usuario=>{
     
      if (usuario) {
        usuarioexistente = usuario.nombreUsuario
      }  else{
        usuarioexistente = null
      } 

      if (usuarioexistente == null) {
        errors.message = "El nombre de usuario que ingresó no existe"
        res.locals.errors=errors
        return res.render("login")
      }

     else if (bcrypt.compareSync(req.body.password, usuario.contraseña)) {
         req.session.usuario = usuario.nombreUsuario,
         req.session.userId = usuario.id

          if (req.body.rememberMe) {
            res.cookie('userId', usuario.id, {maxAge:2000*60*5})
          }
          res.redirect('/')
        } else{
          errors.message = 'la contraseña que ha ingresado es incorrecta'
          res.locals.errors=errors
          res.render('login')
        }
    }).catch(err => {console.log(err)})
  },

  logout:(req, res, next)=>{
    req.session.destroy()
    res.clearCookie("userId")
    res.redirect("/")
  }
}
 
module.exports = controlador