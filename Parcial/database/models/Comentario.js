module.exports = (sequelize, dataTypes) => {

    const Comentario = sequelize.define('Comentario' , { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        comentario: {
            type: dataTypes.STRING
        },
        fechaCreacion: {
            type: dataTypes.DATE
        },
        usuarioId: {
            type: dataTypes.INTEGER, 
            field: "usuarios_id"
        },
        productosId: {
            type: dataTypes.INTEGER, 
            field: "productos_id"
        },
    }, {
        tableName: "comentarios", 
        timestamps: false
    });
    Comentario.associate=(db)=>{
        Comentario.belongsTo(db.Usuario,{
            as: "usuario",
            foreignKey:"usuarios_id",
        }),
        Comentario.belongsTo(db.Producto,{
            as: "producto",
            foreignKey:"productos_id",
        })
    }
    return Comentario; 
}; 