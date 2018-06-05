const Sequelize = require('sequelize')
const db = require('../db')
const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.ENUM('happy', 'sad'),
    allowNull: false
  }
})

module.exports = Review
