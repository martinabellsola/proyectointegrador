let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   let filtronuevos = {
      order: [
         ['fechaCreacion', 'DESC'],
      ],
     limit: 8,
   }
   let filtroviejos = {
      order: [
         ['fechaCreacion', 'ASC'],
      ],
      limit: 8,
   }     
   db.Producto.findAll(filtronuevos).then(productosnuevos=>{ 
   db.Producto.findAll(filtroviejos).then(productosviejos=>{
      res.render("index", { products: productosnuevos, productsviejos:productosviejos})
      } )
   }).catch(err => {console.log(err)})
 },

 producto: (req, res, next)=>{
   const filtro= {
      include:[{
         association:"comentario", 
         include:"usuario",
         where: {productosId: req.params.id}
      }]
   }
   db.Producto.findByPk(req.params.id, filtro).then(products=>{
      res.render("product", {products: products})
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
      imagen : req.file.filename,
      descripcion: req.body.descripcion,
      fechaCreacion: req.body.fecha,
      usuarioId:  req.session.userId
   }).then( productocreado=>{
      res.redirect('../product/' + productocreado.id)
   }).catch(err => {console.log(err)})
  }, 

  commentAdd: (req, res, next)=>{
   db.Comentario.create({
      comentario: req.body.comentario,
      usuarioId: req.session.userId,
      productosId: req.body.productId,
   }).then(comentarioCreado =>{
      res.redirect('../product/' + req.body.productId)
   }).catch(err => {console.log(err)})
  }
  // agregar con moment fecha de creación = hoy 
}

module.exports = controlador

