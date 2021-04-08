var usuarios = require("../data/users")

const controlador = {
    profile: (req, res, next)=>{
        res.render("index", {usuarios: usuarios})
      },
}

module.exports = controlador