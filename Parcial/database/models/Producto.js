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
        fechaCreacion: {
            type: dataTypes.DATE
        },
        usuarioId: {
            type: dataTypes.INTEGER, 
            field: "usuarios_id"
        },
    }, {
        tableName: "productos", 
        timestamps: false
    });
    Producto.associate=(db)=>{
        Producto.hasMany(db.Comentario,{
            as: "comentario",
            foreignKey:"usuarios_id",
        })
    }
    return Producto; 
}; 