module.exports = function (sequelize, name, email, password) {
    var User = sequelize.define('Article', {
        name: {
            type: sequelize.STRING
        },
        email: {
            type: sequelize.STRING
        },
        password: {
            type: sequelize.STRING
        },
        created: {
            type: sequelize.DATE
        }
    }, {
        timestamps: true
    });

    return User;
}
