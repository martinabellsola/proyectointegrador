const products = require("../data/products")

const controlador = {
 index: (req, res, next)=>{
   res.render("index", { products: products})
 }

}

module.exports = controlador

