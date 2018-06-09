import axios from 'axios'

/**
 * ACTION TYPES
 */
// const GET_CARTS = 'GET_CARTS'
// view my carts (closed) OR view all carts (admin)
const GET_OPEN_CART = 'GET_OPEN_CART'
// only for open carts (users, by id) (un-logged-in users, by session?)
const ADD_CART = 'ADD_CART'
const EDIT_CART = 'EDIT_CART'
// const DELETE_CART = 'DELETE_CART'
const ADD_PRODUCT_NO_USER = 'ADD_PRODUCT_NO_USER'
const CLOSE_CART = 'CLOSE_CART'
const DELETE_PRODUCT_NO_USER = 'DELETE_PRODUCT_NO_USER'

/**
 * ACTION CREATORS
 */
const getOpenCart = cart => ({type: GET_OPEN_CART, cart})
const closeCart = () => ({type: CLOSE_CART})
const addCart = cart => ({
  type: ADD_CART,
  cart
})
const editCart = cart => ({type: EDIT_CART, cart})

// export const addCart = (cart) => {
//   return async dispatch => {
//     try {
//       const response = await axios.post('/', cart)
//     }
//   }
// }

export const addProductNoUser = (product) => {
  return {
    type: ADD_PRODUCT_NO_USER,
    product
  }
}

export const deleteProductNoUser = (product) => {
  return {
    type: DELETE_PRODUCT_NO_USER,
    product
  }
}

/**THUNKS **/
export const retrieveOpenCart = (user) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/carts/open/${user.id}`)
      const openCart = response.data
      dispatch(getOpenCart(openCart))
      return openCart
    }
    catch (err) {console.err('Error getting cart', err.message)}
  }
}

export const createNewCart = (user, products) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/carts', {
        userId: user.id,
        products: products
      })
      const cart = response.data
      dispatch(addCart(cart))
    }
    catch (err) { console.err('Error creating cart', err.message) }
  }
}

export const closeTheCart = cart => {
  return async dispatch => {
    try {
      const response = await axios.patch(`/api/carts/${cart.id}`, {status: 'closed', date: new Date()})
      const closedCart = response.data
      dispatch(closeCart(closedCart))
    }
    catch (err) { console.err('Error closing cart', err.message) }
  }
}

export const editTheCart = (cart, user) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/carts/open`, {
        products: cart.products,
        user: user
      })
      const editedCart = response.data
      dispatch(editCart(editedCart))
    }
    catch (err) { console.err('Error editing cart', err.message)}
  }
}

const initialCart = {
  products: []
}

export default (state = initialCart, action) => {
  switch (action.type) {
    case ADD_PRODUCT_NO_USER: {
      return {...state, products: [...state.products, action.product]}
    }
    case GET_OPEN_CART: {
      return action.openCart
    }
    case CLOSE_CART: {
      return initialCart
    }
    case DELETE_PRODUCT_NO_USER: {
      return {...state, products: state.products.filter(product => product.id !== action.product.id)}
    }
    case ADD_CART: {
      return action.cart
    }
    case EDIT_CART: {
      return action.cart
    }
    default: return state
  }
}
