import axios from 'axios'

/**
 * ACTION TYPES
 */
const ALL_CARTS_FOR_USER = 'ALL_CARTS_FOR_USER'

/**
 * ACTION CREATORS
 */
const getAllCartsForUser = carts => ({type: ALL_CARTS_FOR_USER, carts})

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

/**DEFAULT STATE **/
const inititalCartList = []

/**REDUCER **/
export default (state = inititalCartList, action) => {
  switch (action.type) {
    case ALL_CARTS_FOR_USER:
      return action.carts
    default:
      return state
  }
}
