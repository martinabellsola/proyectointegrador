module.exports = (sequelize, dataTypes) => {

    const UserFollower = sequelize.define('UserFollower' , { 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        seguidoId: {
            type: dataTypes.INTEGER, 
            field: "seguido_id"
        },
        seguidorId: {
            type: dataTypes.INTEGER, 
            field: "seguidor_id"
        },
    }, {
        tableName: "usersFollowers", 
    });
    return UserFollower; 
}; 