import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_CARTS_FOR_USER = 'ALL_CARTS_FOR_USER'
const GET_ALL_CARTS = 'GET_ALL_CARTS'

/**
 * ACTION CREATORS
 */
const getAllCartsForUser = carts => ({type: ALL_CARTS_FOR_USER, carts})
const allCarts = carts => ({ type: GET_ALL_CARTS, carts})

/**THUNKS **/
export const getCartsForUser = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/carts')
      const cartList = response.data
      dispatch(getAllCartsForUser(cartList))
    } catch (err) {
      console.log('Error getting all carts for user: ', err.message)
    }
  }
}

export const getAllCarts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/carts/admin')
      const cartList = response.data
      dispatch(allCarts(cartList))
    } catch (err) {
      console.log('Error getting all the carts: ', err.message)
    }
  }
}

/**DEFAULT STATE **/
const inititalCartList = []

/**REDUCER **/
export default (state = inititalCartList, action) => {
  switch (action.type) {
    case ALL_CARTS_FOR_USER:
      return action.carts
    case GET_ALL_CARTS:
      return action.carts
    default:
      return state
  }
}
