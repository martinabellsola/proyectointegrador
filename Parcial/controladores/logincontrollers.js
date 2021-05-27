let db = require('../database/models')
const bcrypt= require('bcryptjs')

const controlador = {   
  login: (req, res, next)=>{
      res.render("login")
  },

  validacion:(req, res, next)=>{
    const filtro = {
      where: {nombreUsuario: req.body.nombreUsuario }
    }
    db.Usuario.findOne(filtro).then(usuario=>{
     console.log(req.body.password)  
     console.log(usuario.contraseña)
     if (bcrypt.compareSync(req.body.password, usuario.contraseña)) {
         req.session.usuario = usuario.nombreUsuario,
         req.session.userId = usuario.id

          if (req.body.rememberMe) {
            res.cookie('userId', usuario.id, {maxAge:2000*60*5})
          }
          res.redirect('/')
        } else{
          res.redirect('/register')
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