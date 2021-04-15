const products = require("../data/products")

const controlador = {
 index: (req, res, next)=>{
   res.render("index", { products: products})
 },
 producto: (req, res, next)=>{
    let id= req.params.id
    for (let index = 0; index < products.length; index++) {
        if (id == products[index].idProducto) {
        res.render("product", {products:products[index]})
        }
    }
    
 },
 productoAdd: (req, res, next)=>{
  res.render("product-add", { products: products} )
  },
}

module.exports = controlador

