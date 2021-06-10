let db = require('../database/models')
const Op = db.Sequelize.Op;

const controlador = {
  search: (req, res, next)=> {
    let filtro = {
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
      }
    }
    const filtro1= {
      include:[{
        association:"Usuario", 
    }]
   }
    db.Producto.findAll(filtro).then(resultados=>{
    res.render("search-results", {products: resultados })
    console.log('ESTEFILTRO');
    console.log( resultados );
    }).catch(err => {console.log(err)})
  }
}
module.exports = controlador
