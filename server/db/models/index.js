const db = require("../db");
const User = require("./user");
const Product = require("./product");
const {Cart, cartProducts} = require("./cart");
const Review = require("./review");
const Category = require("./category");

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsToMany(Product, { through: "cartProducts" })
Product.belongsToMany(Cart, { through: "cartProducts" })

User.hasMany(Cart);
Cart.belongsTo(User);

//explicitly defining that products will have a categories key,
//and that categories will have products key
// Product.belongsToMany(Category, {
//   through: "productCategory",
//   as: "categories"
// });
// Category.belongsToMany(Product, { through: "productCategory", as: "products" });
Product.belongsToMany(Category, {
  through: "productCategory"
});
Category.belongsToMany(Product, { through: "productCategory" })

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Product,
  Cart,
  Review,
  Category,
  cartProducts
}
