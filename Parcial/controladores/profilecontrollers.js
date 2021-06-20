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
      res.render("profile", {usuarios: usuario, producto: usuario.producto.length, comentario: usuario.comentario.length, seguidores:  usuario.seguidores})
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
        
          let filtro = {
            include:[
              {  
                association: "producto",  
                include: "comentario"
              }, 
              {  
                association: "comentario",  
              }, 
           ],
          }

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
          let filtro = {
            include:[
              {  
                association: "producto",  
                include: "comentario"
              }, 
              {  
                association: "comentario",  
              }, 
           ],
          }
            db.Usuario.findByPk(req.body.id, filtro).then(usuarionuevo=>{
              res.render("profile", {usuarios:usuarionuevo, producto:usuarionuevo.producto.length, comentario:usuarionuevo.comentario.length})
            }) 
      })
    } else{
      errors.message = "Porfavor es necesario que la contraseña sea mayor a 4 digitos"
      res.locals.errors = errors
      db.Usuario.findByPk(req.body.id).then(usuario=>{
        res.render("profile-edit", {usuarios:usuario,})
      }).catch(err => {console.log(err)})
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
    db.UserFollower.create({
      seguidorId: res.locals.usuarioId,
      seguidoId: req.body.followedId,
    }).then (usuario =>{
      res.redirect('/profile/' + usuario.seguidoId)
    })
  }

}

module.exports = controlador
