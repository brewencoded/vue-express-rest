var Sequelize = require('sequelize');
var db = new Sequelize('sqlite3', null, null, {
    dialect: 'sqlite'/*,
    // uncomment this to persist the database to a file instead of in memory
    storage: './app.db'*/
});
module.exports = {
    db: db,
    SECRET: 'kjlsda;kjfkjl;:LIHJHD:Ijkhfi27830fh8ncf3290n()NU(C$)(N)asdfsgfLKJHLKJ'
};
