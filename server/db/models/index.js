const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const Review = require('./review')
const Category = require('./category')
// const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsToMany(Product, { through: 'cartProducts' })
Product.belongsToMany(Cart)
User.hasMany(Cart)
Cart.belongsTo(User)
User.hasMany(Cart)
Product.belongsToMany(Category, { through: 'productCategory' })
Category.belongsToMany(Product)
// User.hasMany(Review)
// Review.belongsTo(User)
// Product.hasMany(Review)
// Review.belongsTo(Product)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Cart,
  Review,
  Category
}
