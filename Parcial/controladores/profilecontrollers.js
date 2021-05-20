const db = require("../database/models")
const bcrypt = require('bcryptjs')

const controlador = {
  edit:(req,res,next)=>{
    db.Usuario.findByPk(req.query.id).then( usuario =>{
      res.render("profile-edit", {usuario:usuario })
      console.log(usuario);
      
  })
},
    
  profile: (req, res, next)=>{
    db.Usuario.findByPk(req.params.id).then(usuario=>{
      filtro={
         where:{ usuarioId : req.params.id }
      }
      db.Producto.findAll(filtro).then( products =>{
        res.render("profile", {usuarios:usuario, products: products})
    })}).catch(err => {console.log(err)})
  },

  editProfile: (req,res,next)=>{

    let contraencriptada = bcrypt.hashSync(req.body.contra)

    db.Usuario.update({
      nombre: req.body.nombre,
      mail: req.body.mail,
      contraseña: contraencriptada,
      imagen: req.file.filename
    },
    {where: {id: req.body.id}}
    ).then( usuario =>{
      res.redirect("/profile/" + usuario.id )
      console.log(usuario);
      
  }).catch(err => {console.log(err)})
},
}

module.exports = controlador

