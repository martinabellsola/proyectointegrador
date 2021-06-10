let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   let filtronuevos = {
      order: [
         ['createdAt', 'DESC'],
         //¿createdAt?
      ],
     limit: 8,
   }
   let filtroviejos = {
      order: [
         ['createdAt', 'ASC'],
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
      }]
   }
   db.Producto.findByPk(req.params.id, filtro).then(products=>{
   db.Usuario.findByPk(products.usuarioId).then( usuarioproducto=>{  
      res.render("product", {products: products, usuarioproducto:usuarioproducto })
      console.log(usuarioproducto);
      console.log('ES ESTE LOG');
   })  }).catch(err => {console.log(err)}) 
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
      usuarioId:  req.session.userId
   }).then( productocreado=>{
      res.redirect('../product/' + productocreado.id)
   }).catch(err => {console.log(err)})
  }, 

  productoEdit: (req, res, next)=>{
   db.Producto.findByPk(req.params.id).then(products=>{
      res.render("product-edit", { products: products} )
   }).catch(err => {console.log(err)})
  },

  productoEditPost:(req, res, next)=>{
   db.Producto.update({
      nombre: req.body.nombre,
      imagen : req.file.filename,
      descripcion: req.body.descripcion,
      usuarioId:  req.session.userId
   },{
      where: {id: req.body.id}
   }).then(productocreado=>{
      res.redirect('../product/' + req.body.id)
   }).catch(err => {console.log(err)})
  }, 
  productoBorrarvista:(req, res, next)=>{
   db.Producto.findByPk(req.params.id).then(products=>{
      res.render("product-borrar", { products: products} )
   }).catch(err => {console.log(err)})
  },
  productDelete:(req, res, next)=>{
     db.Producto.destroy({where:{ id:req.body.id}}).then(
        res.redirect('/')
     )
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
}

module.exports = controlador

