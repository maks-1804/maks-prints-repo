import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products, { loadAllProducts } from './products'
import reviews from './reviews'
import search from './search'
import cart, { frontEndCartReducer } from './carts'

const reducer = combineReducers({ user, products, reviews, search, cart, frontEndCartReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

