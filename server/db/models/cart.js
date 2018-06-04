const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  date: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  subtotal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart
