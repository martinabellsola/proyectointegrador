module.exports = (sequelize, dataTypes) => {

    const Producto = sequelize.define('Producto' , { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        usuarioId: {
            type: dataTypes.INTEGER, 
            field: "usuarios_id"
        },
    }, {
        tableName: "productos", 
    });
    Producto.associate=(db)=>{
        Producto.hasMany(db.Comentario,{
            as: "comentario",
            foreignKey:"productos_id",
        })
    }
    return Producto; 
}; 