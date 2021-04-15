var usuarios = require("../data/users")

const controlador = {   
  login: (req, res, next)=>{
      res.render("login", {usuarios:usuarios})
  }
}

module.exports = controlador