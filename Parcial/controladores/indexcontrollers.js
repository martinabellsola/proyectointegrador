let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
 index: (req, res, next)=>{
   let filtronuevos = {
      order: [
         ['createdAt', 'DESC'],
      ],
      limit: 8,
      include:[
         {  
            association: "usuario",  
         }, 
      ],
   }
   let filtroviejos = {
      order: [
         ['createdAt', 'ASC'],
      ],
      limit: 8,
      include:[
         {  
            association: "usuario",  
         }, 
      ],
   }     
   db.Producto.findAll(filtronuevos).then(productosnuevos=>{ 
   db.Producto.findAll(filtroviejos).then(productosviejos=>{
      res.render("index", {products: productosnuevos, productsviejos:productosviejos})
      } )
   }).catch(err => {console.log(err)})
 },

 producto: (req, res, next)=>{
   const filtro= {
      include:[
         {  
            association: "comentario",
            order: [
               ["createdAt", "ASC"]
            ],
            include: "usuario"
         }, 
         {  
            association: "usuario",  
         }, 
      ],
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
   let errors = {}
   if (res.locals.logueado){
      db.Producto.create({
      nombre: req.body.nombre,
      imagen : req.file.filename,
      descripcion: req.body.descripcion,
      usuarioId:  req.session.userId
   }).then(productocreado=>{
      res.redirect('../product/' + productocreado.id)
   }).catch(err => {console.log(err)})
   } else{
      errors.message = "Para crear un producto debes de iniciar sesión"
      res.locals.errors = errors
         const filtro = {
            include:[
               {association: "usuario" } 
            ]
         }
         db.Producto.findByPk(req.body.id, filtro).then(products=>{
            res.render("product-add", { products: products} )
         }).catch(err => {console.log(err)})
      }
   },
  productoEdit: (req, res, next)=>{
   db.Producto.findByPk(req.params.id).then(products=>{
      res.render("product-edit", { products: products} )
   }).catch(err => {console.log(err)})
  },

  productoEditPost:(req, res, next)=>{
   let errors = {}
   if(res.locals.usuarioId == req.body.usuarioId){
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
   } else{
      errors.message = "Usted no esta habilitado a editar este producto"
      res.locals.errors = errors
      db.Producto.findByPk(req.body.id).then(products=>{
         res.render("product-edit", { products: products} )
      }).catch(err => {console.log(err)})
   }   
  },
   

  productoBorrarvista:(req, res, next)=>{
   let filtro = {include:[{association:"usuario"}]}
   db.Producto.findByPk(req.params.id, filtro).then(products=>{
      res.render("product-borrar", { products: products} )
   }).catch(err => {console.log(err)})
  },

  productDelete:(req, res, next)=>{
   let validacion = req.body.validacion
   let errors = {}
   if (res.locals.usuarioId == req.body.usuarioid) {
      if (validacion == "DELETE") {
      db.Producto.destroy({where:{id:req.body.id}}).then(
         res.redirect('/') )
      } else{
            errors.message = "El valor ingresado no coincide con la palabra DELETE"
            res.locals.errors = errors
            const filtro = {
               include:[
                  {association: "usuario" } 
               ]
            }
            db.Producto.findByPk(req.body.id, filtro).then(products=>{
               res.render("product-borrar", { products: products} )
            }).catch(err => {console.log(err)})
      }
   }else{ 
      res.redirect('/')
   }
   },

  commentAdd: (req, res, next)=>{
   let errors = {}
   if (req.body.usuarioId == res.locals.usuario) {
      db.Comentario.create({
         comentario: req.body.comentario,
         usuarioId: req.session.userId,
         productosId: req.body.productId,
      }).then(comentarioCreado =>{
         res.redirect('../product/' + req.body.productId)
      }).catch(err => {console.log(err)})
   } else{
      errors.message = "Debes de registrarte para comentar"
      res.locals.errors = errors
      res.redirect("../register")
   }
   },   
}

module.exports = controlador

