const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./Product')

const Cart = db.define('cart', {
  date: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  subtotal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,

  }
  // should just be a function that sums the products in the cart
  // could add additional fields in the join table (quantity instead of having 5 instances of the same product, for example)
})

Cart.prototype.addProduct = async function(product){
  const foundProduct = await Product.findById(product.id)
  Cart.addProduct(foundProduct)
}

// add an instance method to add product to cart

module.exports = Cart
