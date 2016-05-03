var Article = require('../models/article');
var User = require('../models/user');

// associations
User.hasMany(Article, {
    foreignKeyConstraint: true,
    foreignKey: 'email'
});

Article.belongsTo(User, {
    foreignKeyConstraint: true,
    foreignKey: 'email'
});


module.exports = {
    User: User,
    Article: Article
};
