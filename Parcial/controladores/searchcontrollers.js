let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
  search: (req, res, next)=> {
    let filtro = {
      where: {
        descripcion: {
            [Op.like]: '%' + req.query.search + '%'
        },
        nombre: {
          [Op.like]: '%' + req.query.search + '%'
      }
      }
    }
    db.Producto.findAll(filtro).then(resultados=>{
         res.render("search-results", {products: resultados})
    })
  }
}
module.exports = controlador
