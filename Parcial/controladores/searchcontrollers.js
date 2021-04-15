var products= require('../data/products')
const controlador = {
  search: (req, res, next)=>{
    res.render("search-results", { products: products})
  }
    
}

module.exports = controlador