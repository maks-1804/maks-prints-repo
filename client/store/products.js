import axios from 'axios'
import history from '../history' // we'll see if we need this in the thunks

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })
const addNewProduct = product => ({ type: ADD_NEW_PRODUCT, product })
const editProduct = product => ({ type: EDIT_PRODUCT, product })
const deletedProduct = productId => ({ type: DELETE_PRODUCT, productId })

/**
 * THUNK CREATORS
 */

export const loadAllProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch(getProducts(products))
    } catch (err) {
      console.log('Error getting all products: ', err.message)
    }
  }
}

export const addProduct = (product, ownProps) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/products', product)
      dispatch(addNewProduct(res.data))
      ownProps.history.push('/admin/dashboard')
    } catch (err) {
      console.log('Error adding new product: ', err.message)
    }
  }
}

export const updateProduct = (id, product) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, product)
      dispatch(editProduct(data))
    } catch (err) {
      console.log('Error editing product: ', err.message)
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deletedProduct(productId))
    } catch (err) {
      console.log('Error deleting product: ', err.message)
    }
  }
}

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * REDUCER
 */

export default (state = defaultProducts, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_NEW_PRODUCT:
      return [...state, action.product]
    case EDIT_PRODUCT:
      return state.map(product => {
        if (product.id === action.product.id) {
          return action.product //if the ids match, return updated product
        }
        return product //otherwise, return it as is
      })
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
