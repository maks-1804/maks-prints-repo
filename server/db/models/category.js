const Sequelize = require('sequelize');
const db = require('../db')

//had to remove the unique: true condition due to errors when seeding?
const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category;
