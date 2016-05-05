var Sequelize = require('sequelize');
var db = new Sequelize('sqlite3', null, null, {
    dialect: 'sqlite',
    storage: './app.db' // persist data to file. default: memory
});
module.exports = {
    db: db,
    SECRET: 'kjlsda;kjfkjl;:LIHJHD:Ijkhfi27830fh8ncf3290n()NU(C$)(N)asdfsgfLKJHLKJ'
};
