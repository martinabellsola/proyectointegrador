const controlador = {
    search:(req,res,next)=>{
        res.render("search-results", {usuarios: usuarios} )
      }
}

module.exports = controlador