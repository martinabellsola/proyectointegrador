module.exports = (sequelize, dataTypes) => {
    const Seguidor = sequelize.define('Seguidor' , { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        seguido: {
            type: dataTypes.INTEGER,
            field: "seguido_id"
        },
        seguidor: {
            type: dataTypes.INTEGER,
            field: "seguidor_id"
        },
    }, {
        tableName: "seguidores", 
    });
    Seguidor.associate=(db)=>{
        Seguidor.hasMany(db.Usuario,{
            as: "Seguido",
            foreignKey:"seguido_id",
        }),
        Seguidor.hasMany(db.Usuario,{
                as: "Seguidor",
                foreignKey:"seguidor_id",
            }) }

    return Seguidor; 
}