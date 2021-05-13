let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
  search: (req, res, next)=> {
    let filtro = {
      where: {
        descripcion: {
            [Op.like]: '%' + req.query.search + '%'
        }
      }
    }
    db.Producto.findAll(filtro).then(resultados=>{
      // db.Comentario.findByPk(resultados.id).then(resultadoComentarios=>{
         res.render("search-results", {products: resultados})
      //})
    })
    //.catch(err => {console.log(err)})
  }
}
module.exports = controlador
