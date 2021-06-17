const db = require("../database/models")
const bcrypt = require('bcryptjs')

const controlador = {
  profile: (req, res, next)=>{
    let filtro = {
      include: [{association:"producto"}, {association:"comentario"}]
    }
    db.Usuario.findByPk(req.params.id, filtro).then(usuario=>{
      res.render("profile", {usuarios:usuario, producto:usuario.producto.length, comentario:usuario.comentario.length})
    }).catch(err => {console.log(err)})
  },

  edit: (req,res,next)=>{
    db.Usuario.findByPk(req.params.id).then(usuario=>{
       res.render("profile-edit", {usuarios:usuario,})
    }).catch(err => {console.log(err)})
  },

  editProfile: (req,res,next)=>{
    let errors = {}
    let contraencriptada = bcrypt.hashSync(req.body.contra)
  
    if (res.locals.usuarioId!=req.body.id) {
      errors.message = "Usted no tiene permiso para editar este usuario"
      res.locals.errors = errors
      db.Usuario.findByPk(req.body.id).then(usuario=> {
        res.render("profile-edit", {usuarios:usuario,})
      })}

      if(req.body.contra=="") {
      db.Usuario.update({
        nombreUsuario: req.body.usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        imagen: req.file.filename},{where:{id:req.body.id}}).then(usuario=>{
        
        let filtro = {include: [{association:"producto"}, {association:"comentario"}]}
          db.Usuario.findByPk(req.body.id, filtro).then(usuarionuevo=>{
            res.render("profile", {usuarios:usuarionuevo, producto:usuarionuevo.producto.length, comentario:usuarionuevo.comentario.length})
        })
      })
       
    } else if(req.body.contra.length >= 4) {
      db.Usuario.update({
        nombreUsuario: req.body.usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        contraseña: contraencriptada,
        imagen: req.file.filename},{where:{id:req.body.id}}).then(usuario=>{
          let filtro = {include: [{association:"producto"}, {association:"comentario"}]}
            db.Usuario.findByPk(req.body.id, filtro).then(usuarionuevo=>{
              res.render("profile", {usuarios:usuarionuevo, producto:usuarionuevo.producto.length, comentario:usuarionuevo.comentario.length})
            }) 
      })
    } else{
      errors.message="Porfavor es necesario que la contraseña sea mayor a 4 digitos"
      res.locals.errors=errors
      db.Usuario.findByPk(req.body.id).then(usuario=>{
        res.render("profile-edit", {usuarios:usuario,})
      }).catch(err => {console.log(err)})
    }   
  },

  eliminarPerfil:(req, res, next)=>{
    if (req.body.id == res.locals.usuarioId) {
      db.Usuario.destroy({where:{id:req.body.id}}).then( 
        req.session.destroy(),
        res.clearCookie("userId"),
        res.redirect('/')
      )}
  }

}

module.exports = controlador

