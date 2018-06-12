const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Cart = db.define('cart', {
  date: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM('open', 'closed', 'processing', 'canceled'),
    defaultValue: 'open'
  },
  subtotal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 0
  }
  // should just be a function that sums the products in the cart
  // could add additional fields in the join table (quantity instead of having 5 instances of the same product, for example)
})

const cartProducts = db.define("cartProducts", {
  productQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

Cart.prototype.addNewProduct = async function(id, number){
  try {
    await this.addProduct(id)
    // const foundProduct = await Product.findAll({
    //   // include: [{ model: db.models.cart }],
    //   where: { id: id }
    // })
    // console.log('this is the found product', foundProduct)
    // console.log(this)
    // await this.addProduct(foundProduct)
    // await this.setProducts([...this.dataValues.products, foundProduct])
    // console.log(this.dataValues.products)
    // await foundProduct.productQuantity++
    // console.log(foundProduct.productQuantity)
  } catch (err) { console.error(err.message) }
}


module.exports = {Cart, cartProducts}
