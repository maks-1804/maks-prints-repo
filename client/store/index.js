import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products, { loadAllProducts } from './products'
import reviews from './reviews'
import search from './search'

<<<<<<< HEAD
const reducer = combineReducers({ user, products, reviews })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
=======
const reducer = combineReducers({ user, products, reviews, search })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
>>>>>>> master
const store = createStore(reducer, middleware)

export default store
export * from './user'
