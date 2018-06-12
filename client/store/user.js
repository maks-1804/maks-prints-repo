import axios from 'axios'
import history from '../history'
import { mergeCart } from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const EDIT_USER = 'EDIT_USER'

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const addNewUser = user => ({ type: ADD_USER, user })
const editUser = user => ({ type: EDIT_USER, user })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        dispatch(mergeCart(res.data))
        history.push('/shop')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users', user)
      const newUser = response.data
      dispatch(addNewUser(newUser))
    } catch (err) {
      console.log('Error adding new user: ', err.message)
    }
  }
}

export const updateUser = (id, user) => dispatch => {
  axios
    .put(`/api/users/${id}`, user)
    .then(res => dispatch(editUser(res.data)))
    .catch(err =>
      console.error('Error editing user: ', err.message)
    )
}

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_USER:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
