const products = require("../data/products")
let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   db.Producto.findAll().then(products=>{
      res.render("index", { products: products})
   })
 },
 producto: (req, res, next)=>{
    db.Producto.findByPk(req.params.id).then(products=>{
          res.render("product", {products:products,})
        }
    
    )
    
 },
 productoAdd: (req, res, next)=>{
    res.render("product-add", { products: products} )
 },
 productoCrear:(req, res, next)=>{
    db.Producto.create({
       nombre: req.body.nombre,
       imagen : req.body.imagen,
       descripcion: req.body.descripcion,
       fechaCreacion: req.body.fecha

   }).then(
      productocreado=>{
         res.redirect('../product/'+productocreado.id)
      }
   ).catch(err => {console.log(err)})
}}

module.exports = controlador

