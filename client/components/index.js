/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './Navbar'
export { Login, Signup } from './AuthForm'
export { default as ProductList } from './shop/ProductList'
export { default as NavCategory } from './shop'
export { default as ProductSingle } from './shop/SingleProduct'
export { UserDashboard, UserEdit } from './user'
export { AdminDashboard, AddProduct } from './admin'
//!!!!!!!
export { default as EditProduct } from './admin/EditProduct'
export { default as AllUsers } from './admin/AllUsers'

export { ReviewList } from './reviews'

export { OpenCart, CartProductCard } from './cart'
