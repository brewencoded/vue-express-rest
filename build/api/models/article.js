var User = require('./user');

module.exports = function (sequelize, user, title, body) {
    var Article = sequelize.define('Article', {
        title: {
            type: sequelize.STRING
        },
        body: {
            type: sequelize.STRING
        },
        created: {
            type: sequelize.DATE
        }
    }, {
        timestamps: true
    });

    Article.belongsTo(User);

    return Article;
}
