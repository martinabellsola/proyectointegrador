let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   let filtronuevos = {
      order: [
         ['fechaCreacion', 'DESC'],
      ]}
      let filtroviejos = {
         order: [
            ['fechaCreacion', 'ASC'],
         ]
   }     //habría que crear un nuevo filtro para las más comentadas
   db.Producto.findAll(filtronuevos).then(productosnuevos=>{
      
      db.Producto.findAll(filtroviejos).then(productosviejos=>{
          res.render("index", { products: productosnuevos,productsviejos:productosviejos})
      }
         
      )
     
   }).catch(err => {console.log(err)})

 },


 producto: (req, res, next)=>{
    
   db.Producto.findOne({where:{id:5}, include:[{associate:"comentario"}] }).then(prueba=>{
      console.log(prueba.nombre)
      console.log(prueba.comentario.comentario)
   })
    const filtro= {
         
         include:[{associate:"comentario", include:"usuario"}]
      }
   db.Producto.findByPk(req.params.id, filtro).then(products=>{
     
      db.Comentario.findAll(products.id).then(comentarios=>{
      
            res.render("product", {products:products, comentarios: comentarios})
         
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

