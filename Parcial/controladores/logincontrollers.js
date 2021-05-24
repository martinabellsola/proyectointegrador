
let db = require('../database/models')
const bcrypt= require('bcryptjs')
const controlador = {   
  login: (req, res, next)=>{
      res.render("login")
  },
  validacion:(req, res, next)=>{
    const filtro = {
      where: {nombreusuario: req.body.name }
    }
   db.Usuario.findOne(filtro).then(
     usuario=>{
       if (bcrypt.compareSync(req.body.password, usuario.contraseña)) {
         req.session.usuario= usuario.nombreusuario,
         req.session.id= usuario.id
         if (req.body.rememberMe) {
           res.cookie('userId',usuario.id, {maxAge:1000*60*5})
         }console.log(userId);
       }
     res.redirect('/')
     }

   )
  },
  logout:(req, res, next)=>{
    req.session.destroy()
    res.clearCookie("userId")
    res.redirect("/")
  }
}

module.exports = controlador