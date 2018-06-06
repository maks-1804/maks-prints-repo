import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})


/**
 * THUNK CREATORS
 */

 export const loadAllProducts = () => {
    return async (dispatch) => {
      try {
        const products = await axios.get('/products').data
        dispatch(getProducts(products))
      } catch (err) {
        console.log('Error getting all products: ', err.message)
      }
    }
 }

 /**
 * REDUCER
 */

export default (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
