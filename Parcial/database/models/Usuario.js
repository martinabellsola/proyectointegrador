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
        Usuario.belongsToMany(db.Usuario,{
            as: "seguidos", 
            through: 'seguidores', 
            foreignKey: "seguido_id", 
            otherKey: "seguidores_id", 
        })
    }
    return Usuario; 
}; 