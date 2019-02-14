const db = require('../config/dbConfig')
const Sequelize = require('sequelize');

module.exports = db.define('Heroes', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  }
}, { timestamps: false, });