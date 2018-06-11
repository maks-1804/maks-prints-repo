import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => ({type: GET_ALL_USERS, users})

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    }
    catch (err) { console.error('There was an error adding all users', err.message) }
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS: return action.users
    default: return state
  }
}
