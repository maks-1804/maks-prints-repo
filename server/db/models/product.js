const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  inventoryQuanity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.acacia-wood.com/themes/jtherczeg-multi//assets/images/acacia/empty-img.png'
  }
})

// inventoryQuantity could warrant a class or instance method (called when orded from cart?)

module.exports = Product
