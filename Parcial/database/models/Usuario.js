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
        nombreusuario: {
            type: dataTypes.STRING 
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
        timestamps: false
    });

    return Usuario; 
}; 
