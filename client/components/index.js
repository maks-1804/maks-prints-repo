/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { Login, Signup } from './auth-form'
export { default as ProductList } from './shop/product-list'
export { default as NavCategory } from './shop'
export { default as ProductSingle } from './shop/Product-Single'

export { UserDashboard, UserEdit } from './user'

export { default as EditProduct } from './admin/EditProduct'

export { ReviewList } from './reviews'
