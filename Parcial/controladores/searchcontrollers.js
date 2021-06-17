let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
  search: (req, res, next)=> {
    const filtro = {
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.like]: '%' + req.query.search + '%'
            }
          },
          {
            descripcion: {
              [Op.like]: '%' + req.query.search + '%'
            }
          }
        ]
      }, 
      include:[
        {  
           association: "usuario",  
        }, 
        {  
           association: "comentario",  
        }, 
     ],
    }
    db.Producto.findAll(filtro).then(resultados=>{
      res.render("search-results", {products: resultados})
    }).catch(err => {console.log(err)})
  }
}
module.exports = controlador
