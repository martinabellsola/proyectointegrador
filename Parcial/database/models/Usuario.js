const { any } = require("sequelize/types/lib/operators");

module.exports = (sequelize, dataTypes) => {

    const Usuario = sequelize.define('Usuario' , { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        nombreUsuario: {
            type: dataTypes.STRING,
            field:"nombreusuario"
        },
        contraseña: {
            type: dataTypes.STRING
        },
        mail: {
            type: dataTypes.STRING
        },
        fechaNacimiento: {
            type: dataTypes.DATE
        },
        imagen: {
            type: dataTypes.STRING
        },
        cantidadDeSeguidores: {
            type: dataTypes.INTEGER
        },
    }, {
        tableName: "usuarios", 
    });

    Usuario.associate=(db)=>{
        Usuario.hasMany(db.Comentario,{
            as: "comentario",
            foreignKey: "usuarios_id",
        }),
        Usuario.hasMany(db.Producto,{
            as: "producto",
            foreignKey:"usuarios_id",
        }),
        Usuario.belongsTo(db.Seguidor,{
            as: "Seguido",
            foreignKey:"seguido_id",
        }),
        Usuario.belongsTo(db.Seguidor,{
            as: "Seguidor",
            foreignKey:"seguidor_id",
        })

    }
    return Usuario; 
}; 
