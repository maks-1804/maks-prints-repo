import axios from 'axios'

/**
 * ACTION TYPES
 */
// view my carts (closed) OR view all carts (admin)
// const GET_CARTS = 'GET_CARTS'
const GET_OPEN_CART = 'GET_OPEN_CART'
// only for open carts (users, by id) (un-logged-in users, by session?)
const ADD_CART = 'ADD_CART'
const EDIT_CART = 'EDIT_CART'
// const DELETE_CART = 'DELETE_CART'
const ADD_PRODUCT_NO_USER = 'ADD_PRODUCT_NO_USER'
const CLOSE_CART = 'CLOSE_CART'
const DELETE_PRODUCT_NO_USER = 'DELETE_PRODUCT_NO_USER'
const UPDATE_NUM_AND_SUBTOTAL = 'UPDATE_NUM_AND_SUBTOTAL'
const DELETE_PRODUCT_WITH_USER = 'DELETE_PRODUCT_WITH_USER '

/**
 * ACTION CREATORS
 */
const getOpenCart = cart => ({type: GET_OPEN_CART, cart})
const closeCart = () => ({type: CLOSE_CART})
const addCart = cart => ({type: ADD_CART, cart})
const editCart = cart => ({type: EDIT_CART, cart})
export const updateNumItemsAndSubtotal = products => ({type: UPDATE_NUM_AND_SUBTOTAL, products})
export const addProductNoUser = (product) => ({type: ADD_PRODUCT_NO_USER, product})
export const deleteProductNoUser = (product) => ({type: DELETE_PRODUCT_NO_USER, product})
const deleteProductWithUser = cart => ({type: DELETE_PRODUCT_WITH_USER, cart})


/**THUNKS **/
export const retrieveOpenCart = (user) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/carts/open/${user.id}`)
      //response.data returns an array so accessing it's first element
      let openCart = response.data[0]
      console.log('in store, openCart.products: ', openCart)
      openCart = openCart.products ? openCart : {...openCart, products: []}
      dispatch(getOpenCart(openCart))
      openCart.products && dispatch(updateNumItemsAndSubtotal(openCart.products))
      // return openCart
    }
    catch (err) {console.log('Error getting cart: ', err.message)}
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
    catch (err) { console.log('Error creating cart: ', err.message) }
  }
}

export const closeTheCart = cart => {
  return async dispatch => {
    try {
      const response = await axios.patch(`/api/carts/${cart.id}`, {status: 'closed', date: new Date()})
      const closedCart = response.data
      dispatch(closeCart(closedCart))
    }
    catch (err) { console.log('Error closing cart: ', err.message) }
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
      dispatch(updateNumItemsAndSubtotal(editedCart.products))
    }
    catch (err) { console.log('Error editing cart: ', err.message)}
  }
}

export const deleteTheProductWithUser = (cartId, productId) => {
  return async dispatch => {
    try {
      console.log('in store, ids: ', cartId, productId)
      const response = await axios.put(`/api/carts/open/${productId}`, { cartId })
      const updatedCart = response.data
      dispatch(deleteProductWithUser(updatedCart))
      dispatch(updateNumItemsAndSubtotal(updatedCart.products))
    } catch (err) {
      console.log('Error deleting product from cart: ', err.message)
    }
  }
}


/**DEFAULT STATE **/
const initialCart = {
  products: []
}

/**REDUCER **/
export default (state = initialCart, action) => {
  switch (action.type) {
    case ADD_PRODUCT_NO_USER: {
      return {...state, products: [...state.products, action.product]}
    }
    case GET_OPEN_CART: {
      return action.cart
    }
    case CLOSE_CART: {
      return initialCart
    }
    case DELETE_PRODUCT_WITH_USER:
      return action.cart
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

//------Front End Cart Info ---------//

/**DEFAULT STATE **/
const initialFrontCart = {
  numItemsInCart: 0,
  subtotal: 0
}

/**REDUCER **/
export const frontEndCartReducer = (state = initialFrontCart, action) => {
  switch (action.type) {
    case UPDATE_NUM_AND_SUBTOTAL:
      return {...state,
          numItemsInCart: action.products.reduce( (acc, product) => {
            return acc + product.cartProducts.productQuantity
            }, 0),
          subtotal: (action.products.reduce( (acc, product) => {
            return acc + (product.price * product.cartProducts.productQuantity)
            }, 0) / 100).toFixed(2)
          }
    default:
      return state
  }

}
