const env = require('./env.js');
const Sequelize = require('sequelize');

const db = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  logging: env.logging,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  query:{raw:true}
});


 
 
module.exports = db;