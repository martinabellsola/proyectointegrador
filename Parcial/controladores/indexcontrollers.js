let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   let filtro = {
      order: [
         ['fechaCreacion', 'DESC'],
      ],
   }     //habría que crear un nuevo filtro para las más comentadas
   db.Producto.findAll(filtro).then(products=>{
      res.render("index", { products: products})
   }).catch(err => {console.log(err)})
 },
 producto: (req, res, next)=>{
   db.Producto.findByPk(req.params.id).then(products=>{
      res.render("product", {products:products,})
   }).catch(err => {console.log(err)})
 },
 productoAdd: (req, res, next)=>{
   db.Producto.findAll().then(products=>{
      res.render("product-add", { products: products} )
   }).catch(err => {console.log(err)})
 },
 productoCrear:(req, res, next)=>{
    db.Producto.create({
       nombre: req.body.nombre,
       imagen : req.body.imagen,
       descripcion: req.body.descripcion,
       fechaCreacion: req.body.fecha
      }).then( productocreado=>{
         res.redirect('../product/'+productocreado.id)
      }).catch(err => {console.log(err)})
}}

module.exports = controlador

