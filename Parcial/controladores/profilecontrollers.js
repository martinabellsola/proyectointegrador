var usuarios = require("../data/users")

const controlador = {
    profile: (req, res, next)=>{
        res.render("profile", {usuarios: usuarios})
      },
      edit:(req,res,next)=>{
        res.render("profile-edit", {usuarios: usuarios} )
      }
}

module.exports = controlador