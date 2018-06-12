import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products, { loadAllProducts } from './products'
import reviews from './reviews'
import search from './search'
import cart, { frontEndCartReducer } from './cart'
import cartList from './cartList'
import categories from './categories'
import admin from './admin'
import { createCookieMiddleware } from 'redux-cookie'
import Cookies from 'js-cookie'

const reducer = combineReducers({
  user,
  products,
  reviews,
  search,
  cart,
  frontEndCartReducer,
  categories,
  admin,
  cartList })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }), createCookieMiddleware(Cookies))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

