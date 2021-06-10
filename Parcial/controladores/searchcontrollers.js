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
    const filtro1= {
      include:[{
         association:"Usuario", 
      }]
   }
    db.Producto.findAll(filtro, filtro1).then(resultados=>{
    res.render("search-results", {products: resultados })
    console.log('ESTEFILTRO');
    console.log(filtro1);
    })
  }
}
module.exports = controlador
