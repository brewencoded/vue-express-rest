var Sequelize = require('sequelize');
var db = require('../config').db;

var Article = db.define('article', {
    slug: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [10, 150],
                msg: 'Title must be between 10 and 150 characters.'
            }
        }
    },
    body: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true
});



module.exports = Article;
