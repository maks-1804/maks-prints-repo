import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

const getAllUsers = users => ({type: GET_ALL_USERS, users})
const deletedUser = id => ({ type: DELETE_USER, id})

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    }
    catch (err) { console.error('There was an error adding all users', err.message) }
  }
}
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${id}`)
      dispatch(deletedUser(id))
    } catch (err) {
      console.error('Error deleting user: ', err.message)
    }
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS: return action.users
    case DELETE_USER:
      return state.filter(user => user.id !== action.id)
    default: return state
  }
}
