var Sequelize = require('sequelize');
databaseHost = process.env.MYSQL_HOST || 'localhost';
var username = 'root';
var password = '';

if(databaseHost !== 'localhost') {
  username = 'remote';
  password = 'remote';
}

const sequelize = new Sequelize('wegot_sidebar', username, password, {
  host: databaseHost,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 30,
    idle: 30000,
    acquire: 60000,
  },
});

exports.sequelize = sequelize;