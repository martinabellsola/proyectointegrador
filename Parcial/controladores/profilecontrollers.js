const db = require("../database/models")
const bcrypt = require('bcryptjs')

const controlador = {
  profile: (req, res, next)=>{
    let filtro = {
      include:[
        {  
          association: "producto",  
          include: "comentario"
        }, 
        {  
          association: "comentario",  
        }, 
        {
          association: "seguidores"
        }, 
        {
          association: "seguidos"
        }
     ],
    }
    
    db.Usuario.findByPk(req.params.id, filtro).then(usuario=>{
      let respuesta = []
      usuario.seguidores.forEach(element => {
        respuesta.push(element.id)
      });
      let validacion = respuesta.indexOf(res.locals.usuarioId)
      let final
      if (validacion != -1) {
        final = true
        res.render("profile", {usuarios: usuario, producto: usuario.producto.length, comentario: usuario.comentario.length, seguidores: final})
      } else {
        final = false
        res.render("profile", {usuarios: usuario, producto: usuario.producto.length, comentario: usuario.comentario.length, seguidores: final})
      }
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

      if (req.file != undefined) {
      if(req.body.contra=="") {

          db.Usuario.update({
          nombreUsuario: req.body.usuario,
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          mail: req.body.mail,
          imagen: req.file.filename},{where:{id:req.body.id}}).then(usuario=>{
            res.redirect('/profile/'+ req.body.id)
          })
        }
       else if(req.body.contra.length >= 4) {
      db.Usuario.update({
        nombreUsuario: req.body.usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        contraseña: contraencriptada,
        imagen: req.file.filename},{where:{id:req.body.id}}).then(usuario=>{
          res.redirect('/profile/'+ req.body.id)
      })
    } else{
      errors.message = "Porfavor es necesario que la contraseña sea mayor a 4 digitos"
      res.locals.errors = errors
      db.Usuario.findByPk(req.body.id).then(usuario=>{
        res.render("profile-edit", {usuarios:usuario,})
      }).catch(err => {console.log(err)})
    }   
  }else{
    if(req.body.contra=="") {

      db.Usuario.update({
      nombreUsuario: req.body.usuario,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      mail: req.body.mail,
      },{where:{id:req.body.id}}).then(usuario=>{
        res.redirect('/profile/'+ req.body.id)
      })
    }
   else if(req.body.contra.length >= 4) {
  db.Usuario.update({
    nombreUsuario: req.body.usuario,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    contraseña: contraencriptada,
    },{where:{id:req.body.id}}).then(usuario=>{
      res.redirect('/profile/'+ req.body.id)
  })
} else{
  errors.message = "Porfavor es necesario que la contraseña sea mayor a 4 digitos"
  res.locals.errors = errors
  db.Usuario.findByPk(req.body.id).then(usuario=>{
    res.render("profile-edit", {usuarios:usuario,})
  }).catch(err => {console.log(err)})
}   
    }
  },

  eliminarPerfilVista:(req, res, next)=>{
    db.Usuario.findByPk(req.params.id).then(usuario=>{
      res.render("profile-borrar", {usuario: usuario})
    }).catch(err => {console.log(err)})
   },
 
   eliminarPerfil:(req, res, next)=>{
    let validacion = req.body.validacion
    let errors = {}
    if (res.locals.usuarioId == req.body.id) {
      if (validacion == "DELETE") {
      db.Usuario.destroy({where:{id:req.body.id}}).then(
        req.session.destroy(),
        res.clearCookie("userId"),
        res.redirect('/') 
      )} else{
        errors.message = "El valor ingresado no coincide con la palabra DELETE"
        res.locals.errors = errors
        db.Usuario.findByPk(req.body.id).then(usuario=>{
          res.render("profile-borrar", {usuario: usuario})
        }).catch(err => {console.log(err)})
      }
    }else{ 
      res.redirect('/')
    }
    },

  seguir:(req, res, next)=>{
    if(res.locals.logueado== true){
    if (res.locals.usuarioId!=res.body.followedId) {
       db.UserFollower.create({
      seguidorId: res.locals.usuarioId,
      seguidoId: req.body.followedId,
    }).then (usuario =>{
      res.redirect('/profile/' + usuario.seguidoId)
    })
    }else{
      res.redirect('/')
    } 
    }else{
      res.redirect('/')
   }
  }, 
  dejarSeguir: (req, res, next)=>{
    db.UserFollower.findOne({
      where: {
        seguidorId: res.locals.usuarioId,
        seguidoId: req.body.unfollowedId,
      }
    }).then(dejarUsuario =>{
      db.UserFollower.destroy({where:{id: dejarUsuario.id}}).then (usuario =>{
        res.redirect('/profile/' + req.body.unfollowedId)
      })
    })
   
  }

}

module.exports = controlador
