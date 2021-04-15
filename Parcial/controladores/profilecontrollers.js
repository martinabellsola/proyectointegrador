var usuarios = require("../data/users")
var products= require("../data/products")

const controlador = {
  edit:(req,res,next)=>{
    res.render("profile-edit", {usuarios: usuarios} )
  },
  profile: (req, res, next)=>{
    let id= req.params.id
    for (let index = 0; index < usuarios.length; index++) {
      if (id == usuarios[index].idUsuario) {
        res.render("profile", {
            usuarios: usuarios[index], 
            products: products
        })
      }
    }
  }   
}

module.exports = controlador