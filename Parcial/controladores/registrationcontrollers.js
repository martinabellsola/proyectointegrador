var usuarios= require("../data/users")
const controlador = { 
    
        register: (req, res, next)=>{
            res.render("register", {usuarios:usuarios})
          },
        
    
}

module.exports = controlador