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
      db.Comentario.findAll({where: {productosId:products.id}}).then(comentarios=>{
        //for (let index = 0; index < comentarios.length; index++) {
           // db.Usuario.findByPk(comentarios[index].usuarioId).then(usuario=>{
               res.render("product", {products:products, comentarios: comentarios})
           // })
        //}
      })
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
        console.log(req.body.productId)
      res.redirect('../product/' + req.body.productId)
   }).catch(err => {console.log(err)})
  }
  // agregar con moment fecha de creación = hoy 
}

module.exports = controlador

