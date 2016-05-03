var Sequelize = require('sequelize');
var db = require('../config').db;
var bcrypt = require('bcrypt');

var User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.TEXT,
        primaryKey: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true
});

User.hook('afterValidate', function(user) {
    user.password = bcrypt.hashSync(user.password, 8);
});

module.exports = User;
