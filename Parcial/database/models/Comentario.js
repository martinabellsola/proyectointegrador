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

    return Comentario; 
}; 